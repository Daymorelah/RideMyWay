/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration test for the ride-offer controller', () => {
  let myToken;
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
