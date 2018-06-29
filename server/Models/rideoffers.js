

import connecToDb from './db/connectToDb';

const createRideOffersTable = () => {
  connecToDb.query('DROP TABLE IF EXISTS ride_offers', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table ride_offers. ', err);
    }
    if (res) {
      console.log('Table ride_offers has been dropped succesfully');
      connecToDb.query('CREATE TABLE ride_offers(' +
                  'id SERIAL PRIMARY KEY,' +
                  'number_of_seats SMALLINT NOT NULL,' +
                  'destination VARCHAR(255) NOT NULL,' +
                  'source VARCHAR(255) NOT NULL,' +
                  'driver VARCHAR(255) NOT NULL,' +
                  'time VARCHAR(255) NOT NULL,' +
                  'passengers VARCHAR(255) NOT NULL)', (error, response) => {
        if (error) {
          console.log('An error occurred trying to create table ride_offers.', error);
        }
        if (response) {
          console.log('Table ride_offers has been Created succesfully');
        }
      });
    }
  });
};

export default createRideOffersTable;
