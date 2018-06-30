
import connecToDb from './db/connectToDb';

const createPassengersTable = () => {
  connecToDb('DROP TABLE IF EXISTS passengers', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table passengers.', err);
    }
    if (res) {
      console.log('Table passengers has been dropped succesfully');
      connecToDb('CREATE TABLE passengers(' +
              'id INTEGER,' +
              'username TEXT,' +
              'password TEXT,' +
              'email TEXT)', (error, responce) => {
        if (error) {
          console.log('An error occurred trying to create table passengers.', err);
        }
        if (responce) {
          console.log('Table passengers has been Created succesfully');
        }
      });
    }
  });
};

export default createPassengersTable;
