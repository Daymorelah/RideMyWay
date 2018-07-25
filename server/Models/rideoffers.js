
import connecToDb from './db/connectToDb';

const createRideOffersTable = () => new Promise((resolve, reject) => {
  connecToDb('DROP TABLE IF EXISTS rideOffers CASCADE', (err, res) => {
    if (err) {
      reject(Error('An error occurred trying to drop table rideOffers. ', err));
    }
    if (res) {
      connecToDb(`CREATE TABLE rideOffers(
                    id SERIAL PRIMARY KEY,
                    numberOfSeats SMALLINT NOT NULL,
                    destination VARCHAR(255) NOT NULL,
                    source VARCHAR(255) NOT NULL,
                    driver VARCHAR(255) NOT NULL,
                    time VARCHAR(255) NOT NULL,
                    passengers VARCHAR(255)[] DEFAULT '{}',
                    usersId SMALLINT NOT NULL,
                    CONSTRAINT users FOREIGN KEY (usersId) REFERENCES users(id)
                    )`, (error, response) => {
        if (error) {
          reject(Error('An error occurred trying to create table rideOffers.', error));
        }
        if (response) {
          resolve('Table rideOffers has been Created succesfully');
        }
      });
    }
  });
});
// createRideOffersTable();
export default createRideOffersTable;
