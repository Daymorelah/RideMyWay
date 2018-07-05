
import connecToDb from './db/connectToDb';

const createUserTable = () => {
  connecToDb('DROP TABLE IF EXISTS users CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table users. ', err);
    }
    if (res) {
      console.log('Table users has been dropped succesfully');
      connecToDb(`CREATE TABLE users(
                  id SERIAL PRIMARY KEY,
                  username VARCHAR(255) NOT NULL UNIQUE,
                  password VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL UNIQUE
                  )`, (error, response) => {
        if (error) {
          console.log('An error occurred trying to create table users.', error);
        }
        if (response) {
          console.log('Table users has been Created succesfully');
        }
      });
    }
  });
};

export default createUserTable;
