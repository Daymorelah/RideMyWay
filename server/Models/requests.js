
import connecToDb from './db/connectToDb';

const createRequestsTable = () => {
  connecToDb('DROP TABLE IF EXISTS requests CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table requests. ', err);
    }
    if (res) {
      console.log('Table requests has been dropped succesfully');
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
          console.log('An error occurred trying to create table requests.', error);
        }
        if (response) {
          console.log('Table requests has been Created succesfully');
        }
      });
    }
  });
};

export default createRequestsTable;
