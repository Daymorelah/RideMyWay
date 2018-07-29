
import connecToDb from './db/connectToDb';

const createRequestsTable = () => new Promise((resolve, reject) => {
  connecToDb('DROP TABLE IF EXISTS requests CASCADE', (err, res) => {
    if (err) {
      reject(Error('An error occurred trying to drop table requests. ', err));
    }
    if (res) {
      connecToDb(`CREATE TABLE requests(
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  usersId SMALLINT NOT NULL,
                  CONSTRAINT myuser FOREIGN KEY (usersId) REFERENCES users(id),
                  rideofferId SMALLINT NOT NULL,
                  CONSTRAINT rideoffer FOREIGN KEY (rideofferId) REFERENCES rideOffers(id),
                  UNIQUE(usersId, rideofferId)
                  )`, (error, response) => {
        if (error) {
          reject(Error('An error occurred trying to create table requests.', error));
        }
        if (response) {
          resolve('Table requests has been Created succesfully');
        }
      });
    }
  });
});

export default createRequestsTable;
