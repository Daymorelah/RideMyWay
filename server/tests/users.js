/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration test for the users controller', () => {
  it('should welcome the user to the API', (done) => {
    chai.request(app).get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.deep.equal(200);
        expect(res.body).to.have.property('message');
        done();
      });
  });
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

