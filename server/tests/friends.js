/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration test for friends controller', () => {
  let user1Token;
  let user2Token;
  before((done) => {
    const user1Details = {
      username: 'shakacan2',
      password: 'gibbsFreeEnergy',
      email: 'shakacan2@wemail.com',
    };
    const user2Details = {
      username: 'shakacan3',
      password: 'gibbsFreeEnergy',
      email: 'shakacan3@wemail.com',
    };
    new Promise((resolve, reject) => {
      chai.request(app).post('/api/v1/auth/signup')
        .send(user1Details)
        .end((err, res) => {
          if (err) {
            done(err);
            reject(Error('Error signing up user 2'));
          }
          const { token } = res.body.data;
          user1Token = token;
          if (user1Token) resolve();
        });
    }).then(() => {
      chai.request(app).post('/api/v1/auth/signup')
        .send(user2Details)
        .end((err, res) => {
          if (err) {
            done(err);
            reject(Error('Error signing up user 3'));
          }
          const { token } = res.body.data;
          user2Token = token;
          done();
        });
    }).catch((error) => { Error('Error in rideOffers\'before all hook', error); });
  });
  describe.only('Test for requesting to be friends', () => {
    it('should send a friend request to a user', (done) => {
      chai.request(app).post('/api/v1/users/2/friends/requests')
        .set('x-access-token', user2Token)
        .send({ name: 'shuaib' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(201);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
    it('should send an error message when user sends same request again', (done) => {
      chai.request(app).post('/api/v1/users/2/friends/requests')
        .set('x-access-token', user2Token)
        .send({ name: 'shuaib' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(409);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
  describe.only('Test for accepting a friend request', () => {
    it('should allow a user accept a friend request', (done) => {
      chai.request(app).post('/api/v1/users/3/friends/')
        .set('x-access-token', user1Token)
        .send({ isFriendRequestAccepted: 'true' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(201);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
    it('should prevent user from accepting a friend request again.', (done) => {
      chai.request(app).post('/api/v1/users/3/friends/')
        .set('x-access-token', user1Token)
        .send({ isFriendRequestAccepted: 'true' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(409);
          expect(res.body.status).to.deep.equal('fail');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
  describe.only('Test for rejecting a friend request', () => {
    before((done) => {
      chai.request(app).post('/api/v1/users/2/friends/requests')
        .set('x-access-token', user2Token)
        .send({ name: 'shuaibibi' })
        .end((err) => {
          if (err) {
            done(err);
          }
          done();
        });
    });
    it('should allow a user reject a friend request', (done) => {
      chai.request(app).post('/api/v1/users/3/friends/')
        .set('x-access-token', user1Token)
        .send({ isFriendRequestAccepted: 'false' })
        .end((error, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body.status).to.deep.equal('success');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
});

