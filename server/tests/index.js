/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Ride-My-Way App Tests', () => {
  describe('Integration test for the ride-offer controller', () => {
    it('Should welcome the user to the API', (done) => {
      chai.request(app).get('/api/v1')
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('Should return an array of ride offer objects', (done) => {
      chai.request(app).get('/api/v1/rides')
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.have.property('rides');
          expect(res.body.rides).to.be.an('array');
          done();
        });
    });
    describe('Test for returning a single ride offer', () => {
      it('Should return a ride offer object', (done) => {
        chai.request(app).get('/api/v1/2')
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.have.property('rideOffer');
            done();
          });
      });
      it('Should return an error message when a requested ride offer is not created', (done) => {
        chai.request(app).get('/api/v1/2000')
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
    describe('Tests for creating a ride offer', () => {
      it('should return a message when a user is succesfully created', (done) => {
        const rideOfferDetails = {
          source: 'Obalende',
          destination: 'Tejuosho',
          time: '11:42 A.M',
          driver: 'Obaseki',
        };
        chai.request(app).post('/api/v1/rides')
          .send(rideOfferDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
    describe('Test for request to join a ride', () => {
      it('should return a message when a user has been succesfully added to a ride', (done) => {
        chai.request(app).put('/api/v1/3/requests')
          .send({ passenger: 'Afolayan' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should return an error message when the requested ride is not found', (done) => {
        chai.request(app).put('/api/v1/30/requests')
          .send({ passenger: 'Afolayan' })
          .end((err, res) => {
            expect(res.status).to.deep.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
    describe('Test for deleting a ride offer ', () => {
      it('Should return a success message when a user has been deleted', (done) => {
        chai.request(app).delete('/api/v1/3/rides')
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('Should return an error message when the requested ride offer is invalid', (done) => {
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
  describe('Integration test for the users controller', () => {
    describe('Test to signup a user', () => {
      it('Should create a user send a message that the user has ben created', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: 'tomnjerry',
          email: 'tommy@wemail.com',
        };
        chai.request(app).post('/api/v1/signup')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('Should return an error if any user detail is not present in body', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: null,
          email: 'tommy@wemail.com',
        };
        chai.request(app).post('/api/v1/signup')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
    describe('Test for user login', () => {
      it('Should return a success message when a user has logged in', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: 'tomnjerry',
        };
        chai.request(app).post('/api/v1/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('Should return an error message when password is invalid', (done) => {
        const userDetails = {
          username: 'Thomas',
          password: 'kaybaba',
        };
        chai.request(app).post('/api/v1/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('Should return an error message when user details are not given by the user', (done) => {
        const userDetails = {
          username: null,
          password: 'kaybaba',
        };
        chai.request(app).post('/api/v1/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.status).to.deep.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
    });
    describe('Test for deleting a registered user', () => {
      it('Should return a success message when a user as been deleted successfully', (done) => {
        chai.request(app).delete('/api/v1/2/users')
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('Should return a failure message if the user to be deleted is invalid', (done) => {
        chai.request(app).delete('/api/v1/200/users')
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

