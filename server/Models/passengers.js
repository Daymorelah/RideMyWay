
import connecToDb from './db/connectToDb';

const createPassengersTable = () => {
  connecToDb.query('DROP TABLE IF EXISTS passengers', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table passengers.', err);
      connecToDb.end();
    }
    if (res) {
      console.log('Table passengers has been dropped succesfully');
      connecToDb.query('CREATE TABLE passengers(' +
              'id INTEGER,' +
              'username TEXT,' +
              'password TEXT,' +
              'email TEXT)', (error, responce) => {
        if (error) {
          console.log('An error occurred trying to create table passengers.', err);
          connecToDb.end();
        }
        if (responce) {
          console.log('Table passengers has been Created succesfully');
          connecToDb.end();
        }
      });
    }
  });
};

export default createPassengersTable;
