/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;
describe('Integration test for the requests controller', () => {
  let myToken;
  before((done) => {
    const userDetails = {
      username: 'shakacan',
      password: 'gibbsFreeEnergy',
      email: 'shakacan@wemail.com',
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
});

