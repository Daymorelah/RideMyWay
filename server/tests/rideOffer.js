/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration test for the ride-offer controller', () => {
  let user1Token;
  let user2Token;
  before((done) => {
    const user1Details = {
      username: 'gibbsa',
      password: 'gibbsFreeEnergy',
      email: 'gibbsa@wemail.com',
    };
    const user2Details = {
      username: 'gibbsb',
      password: 'gibbsFreeEnergy',
      email: 'gibbsb@wemail.com',
    };
    new Promise((resolve, reject) => {
      chai.request(app).post('/api/v1/auth/signup')
        .send(user1Details)
        .end((err, res) => {
          if (err) {
            done(err);
            reject(Error('Could not singup user 1'));
          }
          const { token } = res.body.data;
          user1Token = token;
          if (user1Token) resolve();
        });
    }).then(() => new Promise((resolve, reject) => {
      chai.request(app).post('/api/v1/auth/signup')
        .send(user2Details)
        .end((err, res) => {
          if (err) {
            done(err);
            reject(Error('Could not singup user 2'));
          }
          const { token } = res.body.data;
          user2Token = token;
          if (user2Token) resolve();
        });
    })).then(() => new Promise((resolve, reject) => {
      chai.request(app).post('/api/v1/users/4/friends/requests')
        .set('x-access-token', user2Token)
        .send({ name: 'shobambi' })
        .end((err) => {
          if (err) {
            done(err);
            reject(Error('An error occurred while sending a friend request'));
          }
          resolve();
        });
    })).then(() => {
      chai.request(app).post('/api/v1/users/5/friends/')
        .set('x-access-token', user1Token)
        .send({ isFriendRequestAccepted: 'true' })
        .end((err) => {
          if (err) {
            done(err);
          }
          done();
        });
    })
      .catch((error) => { Error('Error in rideOffers\'before all hook', error); });
  });
  describe.only('Tests for creating a ride offer', () => {
    it('should return a message when a ride offer has been succesfully created', (done) => {
      const rideOfferDetails = {
        source: 'Obalende',
        destination: 'Tejuosho',
        time: '11:42 A.M',
        driver: 'Obaseki',
        numberOfSeats: '4',
        passengers: 'Sheyi',
      };
      chai.request(app).post('/api/v1/users/rides')
        .send(rideOfferDetails)
        .set('x-access-token', user1Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(201);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          expect(res.body.data).to.have.property('rideOfferCreated');
          expect(res.body.data.rideOfferCreated).to.be.an('object');
          done();
        });
    });
    it('should return a "failed" message when any ride detail is missing', (done) => {
      const rideOfferDetails = {
        source: 'Obalende',
        destination: 'Tejuosho',
        time: '11:42 A.M',
        numberOfSeats: '4',
        passengers: "{'Sheyi'}",
      };
      chai.request(app).post('/api/v1/users/rides')
        .send(rideOfferDetails)
        .set('x-access-token', user1Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(400);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data.code).to.deep.equal(400);
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
  describe.only('Test for viewing all available ride offers', () => {
    it('should return an array of ride offer objects', (done) => {
      chai.request(app).get('/api/v1/rides')
        .set('x-access-token', user1Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('rideOffers');
          expect(res.body.data.rideOffers.length).to.deep.equal(1);
          done();
        });
    });
  });
  describe.only('Test for returning a single ride offer', () => {
    it('should return the ride offer requested', (done) => {
      chai.request(app).get('/api/v1/rides/1')
        .set('x-access-token', user2Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('ride');
          expect(res.body.data.ride.id).to.deep.equal(1);
          done();
        });
    });
    it('should return an error message when the requested ride offer does not exist', (done) => {
      chai.request(app).get('/api/v1/rides/13')
        .set('x-access-token', user2Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(404);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          expect(res.body.data).to.have.property('ride');
          expect(res.body.data.ride).to.deep.equal(null);
          done();
        });
    });
  });
  describe('Test for deleting a ride offer ', () => {
    it('should return a success message when a user has been deleted', (done) => {
      chai.request(app).delete('/api/v1/3/rides')
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('should return an error message when the requested ride offer is invalid', (done) => {
      chai.request(app).delete('/api/v1/50/rides')
        .end((err, res) => {
          expect(res.status).to.deep.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
  describe.only('Test for getting all rides created by a user', () => {
    it('should return all rides created by a user', (done) => {
      chai.request(app).get('/api/v1/rides/users/offers')
        .set({ 'x-access-token': user1Token })
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('rideOffers');
          done();
        });
    });
  });
});
