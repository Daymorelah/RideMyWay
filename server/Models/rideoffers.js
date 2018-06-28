

import connecToDb from './db/connectToDb';

const createRideOffersTable = () => {
  connecToDb('DROP TABLE IF EXISTS ride_offers', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table ride_offers. ', err);
    }
    if (res) {
      console.log('Table ride_offers has been dropped succesfully'); connecToDb('CREATE TABLE ride_offers(' +
      'id INTEGER,' +
      'username TEXT,' +
      'password TEXT,' +
      'email TEXT)', (error, response) => {
        if (error) {
          console.log('An error occurred trying to create table ride_offers.', err);
        }
        if (response) {
          console.log('Table ride_offers has been Created succesfully');
        }
      });
    }
  });
};

export default createRideOffersTable;
