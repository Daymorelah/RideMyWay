
import connecToDb from './db/connectToDb';

const createRideoffersPassengersTable = () => {
  connecToDb('DROP TABLE IF EXISTS rideoffers_passengers CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table rideoffers_passengers.', err);
    }
    if (res) {
      console.log('Table rideoffers_passengers has been dropped succesfully');
      connecToDb('CREATE TABLE rideoffers_passengers(' +
              'rideoffers_passengers_pk_id SERIAL,' +
              'CONSTRAINT rideoffers_passengers_pk PRIMARY ' +
              'KEY (rideoffers_id, passengers_id),' +
              'passengers_id SMALLINT REFERENCES passengers (id),' +
              'rideoffers_id SMALLINT REFERENCES ride_offers (id)' +
              ')', (error, responce) => {
        if (error) {
          console.log('An error occurred trying to create table rideoffers_passengers.', error);
        }
        if (responce) {
          console.log('Table rideoffers_passengers has been Created succesfully');
        }
      });
    }
  });
};

export default createRideoffersPassengersTable;
