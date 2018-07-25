
import connecToDb from './db/connectToDb';

const createUserTable = () => new Promise((resolve, reject) => {
  connecToDb('DROP TABLE IF EXISTS users CASCADE', (err, res) => {
    if (err) {
      reject(Error('An error occurred trying to drop table users. ', err));
    }
    if (res) {
      connecToDb(`CREATE TABLE users(
                  id SERIAL PRIMARY KEY,
                  username VARCHAR(255) NOT NULL UNIQUE,
                  password VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL UNIQUE
                  )`, (error, response) => {
        if (error) {
          reject(Error('An error occurred trying to create table users. ', error));
        }
        if (response) {
          resolve('Table users has been Created succesfully');
        }
      });
    }
  });
});

export default createUserTable;
