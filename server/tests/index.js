/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Ride-My-Way App Tests', () => {
  describe('Integration test for the ride-offer model', () => {
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
  });
});
