/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import sinon from 'sinon';
import rideController from '../Controller/rideOffersControllers';
import db from '../Models/db/connectToDb';

/* eslint-enable import/no-extraneous-dependencies */

const { expect } = chai;
const OurRides = rideController.getRidesCreatedByUSer;
const user = {
  adduser: (name) => {
    const pref = name;
    const age = 43;
  },
};

describe.only('unit test for ride controller', () => {
  it('should send an error message when there is an internal server error', () => {
    const req = {
      decoded: {
        userId: 'some sql commands',
      },
    };
    const res = {
      status: sinon.spy(),
      jsend: {
        error: {
          code: 500,
          message: 'Could not retrieve ride offers',
        },
      },
    };
    sinon.spy(user, 'adduser');
    const callback = sinon.spy();
    const ride = sinon.spy(rideController, 'getRidesCreatedByUSer');
    // const ride = sinon.stub(rideController, 'getRidesCreatedByUSer');
    const rider = sinon.stub(ride, db);
    OurRides(req, res);
    user.adduser('Wale');
    expect(user.adduser.calledOnce).to.deep.equal(true);
    expect(rider.calledOnce).to.deep.equal(true);
    expect(user.adduser.firstCall.args[0]).to.deep.equal('Wale');
  });
});
