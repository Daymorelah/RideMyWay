
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Ride-My-Way App Tests', () =>{

  describe('Check if test setup is working fine', () =>{
    it('Should return a confirmation that server is workig as expected', (done) =>{
      chai.request(app).get('/')
        .end( (err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

});