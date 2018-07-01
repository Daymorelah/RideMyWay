
import connecToDb from './db/connectToDb';

const createDeriversTable = () => {
  connecToDb('DROP TABLE IF EXISTS drivers CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table drivers. ', err);
    }
    if (res) {
      console.log('Table drivers has been dropped succesfully');
      connecToDb('CREATE TABLE drivers(' +
              'id SERIAL PRIMARY KEY,' +
              'name VARCHAR(255),' +
              'fk_users_id SMALLINT UNIQUE,' +
              'CONSTRAINT fk_users FOREIGN KEY (fk_users_id) REFERENCES users(id)' +
              ')', (error, response) => {
        if (error) {
          console.log('An error occurred creating drivers table', error);
        }
        if (response) {
          console.log('Table drivers has been created successfully');
        }
      });
    }
  });
};

export default createDeriversTable;
