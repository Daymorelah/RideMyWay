/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Ride-My-Way App Tests', () => {
  let myToken;
  let myToken2;
  before((done) => {
    const userDetails = {
      username: 'gibbs',
      password: 'gibbsFreeEnergy',
      email: 'gabo@wemail.com',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const { token } = res.body.data;
        myToken = token;
        return done();
      });
  });
  it('should welcome the user to the API', (done) => {
    chai.request(app).get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.deep.equal(200);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  describe('Integration test for the users controller', () => {
    describe.only('Test to signup a user', () => {
      it('should create a user and send a message that the user has ben created', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: 'tomnjerry',
          email: 'tommy@wemail.com',
        };
        chai.request(app).post('/api/v1/auth/signup')
          .send(userDetails)
          .end((err, res) => {
            myToken2 = res.body.data.token;
            expect(res.status).to.deep.equal(201);
            expect(res.body.data).to.have.property('token');
            expect(res.body.status).to.deep.equal('success');
            expect(res.body.data.message).to.deep.equal('User Thomas created succesfully');
            done();
          });
      });
      it('should return an error if any user detail is not present in body', (done) => {
        const userDetails = {
          username: 'Thomas',
          email: 'tommy@wemail.com',
        };
        chai.request(app).post('/api/v1/auth/signup')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.not.have.property('token');
            expect(res.body.status).to.deep.equal('fail');
            done();
          });
      });
    });
    describe.only('Test for user login', () => {
      it('should return a success message when a user has logged in', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: 'tomnjerry',
        };
        chai.request(app).post('/api/v1/auth/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body.status).to.deep.equal('success');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data.message).to.deep.equal('User Thomas logged in seccessfully');
            done();
          });
      });
      it('should return an error message when password is invalid', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: 'kaybaba',
        };
        chai.request(app).post('/api/v1/auth/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(400);
            expect(res.body.status).to.deep.equal('fail');
            expect(res.body.data).to.not.have.property('token');
            expect(res.body.data.message).to.deep.equal('Username or password is incorrect');
            done();
          });
      });
      it('should return an error message when any user detail is not given by the user', (done) => {
        const userDetails = {
          password: 'kaybaba',
        };
        chai.request(app).post('/api/v1/auth/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(400);
            expect(res.body.status).to.deep.equal('fail');
            expect(res.body).to.not.have.property('token');
            expect(res.body).to.not.have.property('message');
            done();
          });
      });
    });
    describe('Test for deleting a registered user', () => {
      it('should return a success message when a user as been deleted successfully', (done) => {
        chai.request(app).delete('/api/v1/2/users')
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should return a failure message if the user to be deleted is invalid', (done) => {
        chai.request(app).delete('/api/v1/200/users')
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
    describe('Test to update a registered user\'s details', () => {
      it('should return a success message after updating a user\'s detail successfully', (done) => {
        const userDetails = {
          username: 'Mukaila',
          password: 'mukeke',
          email: 'muka@wemail.com',
        };
        chai.request(app).put('/api/v1/1/users')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should return an error message when the user querried is not valid', (done) => {
        chai.request(app).put('/api/v1/20/users')
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'User requested no found');
            done();
          });
      });
    });
  });
  describe('Integration test for the ride-offer controller', () => {
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
          .set('x-access-token', myToken)
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
          .set('x-access-token', myToken)
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
          .set('x-access-token', myToken)
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
          .set('x-access-token', myToken)
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body.status).to.deep.equal('success');
            expect(res.body.data).to.have.property('ride');
            expect(res.body.data.ride.id).to.deep.equal(1);
            done();
          });
      });
      it('should return an error message when a requested ride offer is not created', (done) => {
        chai.request(app).get('/api/v1/rides/2000')
          .set('x-access-token', myToken)
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
    describe.only('Test for requesting to join a ride', () => {
      it('should prevent the creator of  ride from requesting to join a ride he/she created', (done) => {
        chai.request(app).post('/api/v1/rides/1/requests')
          .set('x-access-token', myToken)
          .send({ passengerName: 'Afolayan' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(409);
            expect(res.body.status).to.deep.equal('fail');
            expect(res.body.data).to.have.property('message');
            done();
          });
      });
      it('should return a success message when a user successfully requests to join a ride', (done) => {
        chai.request(app).post('/api/v1/rides/1/requests')
          .set('x-access-token', myToken2)
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
          .set('x-access-token', myToken)
          .send({ passengerName: 'Afolayan' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body.status).to.deep.equal('fail');
            expect(res.body.data).to.have.property('message');
            done();
          });
      });
      it('should return an error message when required fields are missing', (done) => {
        chai.request(app).post('/api/v1/rides/1/requests')
          .set('x-access-token', myToken)
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
        chai.request(app).get('/api/v1/users/rides/1/requests')
          .set('x-access-token', myToken)
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
          .set('x-access-token', myToken)
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
        chai.request(app).put('/api/v1/users/rides/1/requests/1')
          .set('x-access-token', myToken)
          .send({ isAccepted: 'true' })
          .end((error, res) => {
            expect(res.status).to.deep.equal(200);
            done();
          });
      });
      it('should return a success message when a user rejects a request to a ride ', (done) => {
        chai.request(app).put('/api/v1/users/rides/1/requests/1')
          .set('x-access-token', myToken)
          .send({ isAccepted: 'false' })
          .end((error, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body.status).to.deep.equal('success');
            expect(res.body.data).to.have.property('message');
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
    describe('Test for deleting a user from a ride ', () => {
      it('should remove a passenger from a ride offer', (done) => {
        chai.request(app).delete('/api/v1/1/requests')
          .send({ passenger: 'Kemi' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should send an error message if the user to be deleted is not valid', (done) => {
        chai.request(app).delete('/api/v1/1/requests')
          .send({ passenger: 'Kemisola' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should send an error message if the ride offer requested is invalid', (done) => {
        chai.request(app).delete('/api/v1/44/requests')
          .send({ passenger: 'Kemisola' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
  });
});

