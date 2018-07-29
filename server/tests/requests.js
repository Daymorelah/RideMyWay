/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;
describe('Integration test for the requests controller', () => {
  let user1Token;
  let user2Token;
  before((done) => {
    const user1Details = {
      username: 'usera',
      password: 'gibbsFreeEnergy',
      email: 'usera@wemail.com',
    };
    const user2Details = {
      username: 'userb',
      password: 'gibbsFreeEnergy',
      email: 'userb@wemail.com',
    };
    const rideOfferDetails = {
      source: 'Obalende',
      destination: 'Tejuosho',
      time: '11:42 A.M',
      driver: 'Obaseki',
      numberOfSeats: '4',
      passengers: 'Sheyi',
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
      chai.request(app).post('/api/v1/users/6/friends/requests')
        .set('x-access-token', user2Token)
        .send({ name: 'shobambi' })
        .end((err) => {
          if (err) {
            done(err);
            reject(Error('An error ocurred while making a friend request'));
          }
          resolve();
        });
    })).then(() => new Promise((resolve, reject) => {
      chai.request(app).post('/api/v1/users/7/friends/')
        .set('x-access-token', user1Token)
        .send({ isFriendRequestAccepted: 'true' })
        .end((err) => {
          if (err) {
            done(err);
            reject(Error('An error occured while accepting a friend request'));
          }
          resolve();
        });
    }))
      .then(() => {
        chai.request(app).post('/api/v1/users/rides')
          .send(rideOfferDetails)
          .set('x-access-token', user1Token)
          .end((err) => {
            if (err) {
              done(err);
            }
            done();
          });
      })
      .catch((error) => { Error('Error in requests\' before all hook', error); });
  });
  describe.only('Test for requesting to join a ride', () => {
    it('should prevent the creator of a ride from requesting to join a ride he/she created', (done) => {
      chai.request(app).post('/api/v1/rides/2/requests')
        .set('x-access-token', user1Token)
        .send({ passengerName: 'Afolayan' })
        .end((err, res) => {
          expect(res.status).to.deep.equal(409);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
    it('should return a success message when a user successfully requests to join a ride', (done) => {
      chai.request(app).post('/api/v1/rides/2/requests')
        .set('x-access-token', user2Token)
        .send({ passengerName: 'Afolayan' })
        .end((err, res) => {
          expect(res.status).to.deep.equal(201);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
    it('should return an error message when the requested ride is not found', (done) => {
      chai.request(app).post('/api/v1/rides/30/requests')
        .set('x-access-token', user2Token)
        .send({ passengerName: 'Afolayan' })
        .end((err, res) => {
          expect(res.status).to.deep.equal(404);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
    it('should return an error message when required fields are missing', (done) => {
      chai.request(app).post('/api/v1/rides/2/requests')
        .set('x-access-token', user2Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(400);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
  describe.only('Test to get all request to a ride offer', () => {
    it('should return a list of interested passengers to a ride offer', (done) => {
      chai.request(app).get('/api/v1/users/rides/2/requests')
        .set('x-access-token', user1Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          expect(res.body.data).to.have.property('passengers');
          done();
        });
    });
    it('should return null when ride requested is invalid', (done) => {
      chai.request(app).get('/api/v1/users/rides/1000/requests')
        .set('x-access-token', user1Token)
        .end((err, res) => {
          expect(res.status).to.deep.equal(404);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          expect(res.body.data).to.have.property('passengers');
          expect(res.body.data.passengers).to.deep.equal(null);
          done();
        });
    });
  });
  describe.only('Test to either request or reject a ride', () => {
    it('should return a success message when a user accepts a request to a ride ', (done) => {
      chai.request(app).put('/api/v1/users/rides/2/requests/1')
        .set('x-access-token', user1Token)
        .send({ isAccepted: 'true' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(200);
          done();
        });
    });
    it('should return a success message when a user rejects a request to a ride ', (done) => {
      chai.request(app).put('/api/v1/users/rides/1/requests/1')
        .set('x-access-token', user1Token)
        .send({ isAccepted: 'false' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
});

