
import connecToDb from './db/connectToDb';

async function createUserTable() {
  await connecToDb('DROP TABLE IF EXISTS users', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table users. ', err);
    }
    if (res) {
      console.log('Table users has been dropped succesfully');
      connecToDb('CREATE TABLE users(' +
                  'id SERIAL PRIMARY KEY,' +
                  'username VARCHAR(255) NOT NULL,' +
                  'password VARCHAR(255) NOT NULL,' +
                  'email TEXT NOT NULL)', (error, responce) => {
        if (error) {
          console.log('An error occurred trying to create table user.', error);
        }
        if (responce) {
          console.log('Table user has been Created succesfully');
        }
      });
    }
  });
}

export default createUserTable;
