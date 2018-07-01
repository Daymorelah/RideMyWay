
import connecToDb from './db/connectToDb';

const createPassengersTable = () => {
  connecToDb('DROP TABLE IF EXISTS passengers CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table passengers.', err);
    }
    if (res) {
      console.log('Table passengers has been dropped succesfully');
      connecToDb('CREATE TABLE passengers(' +
              'id SERIAL PRIMARY KEY,' +
              'name VARCHAR(255) NOT NULL,' +
              'fk_users_id SMALLINT NOT NULL,' +
              'CONSTRAINT fk_users FOREIGN KEY (fk_users_id) REFERENCES users(id)' +
              ')', (error, responce) => {
        if (error) {
          console.log('An error occurred trying to create table passengers.', error);
        }
        if (responce) {
          console.log('Table passengers has been Created succesfully');
        }
      });
    }
  });
};

export default createPassengersTable;
