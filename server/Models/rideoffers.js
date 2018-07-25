

import connecToDb from './db/connectToDb';

const createRideOffersTable = () => {
  connecToDb('DROP TABLE IF EXISTS rideOffers CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table rideOffers. ', err);
    }
    if (res) {
      console.log('Table rideOffers has been dropped succesfully');
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
          console.log('An error occurred trying to create table rideOffers.', error);
        }
        if (response) {
          console.log('Table rideOffers has been Created succesfully');
        }
      });
    }
  });
};
// createRideOffersTable();
export default createRideOffersTable;
