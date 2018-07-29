
import connecToDb from './db/connectToDb';

const createFriendsTable = () => new Promise((resolve, reject) => {
  connecToDb('DROP TABLE IF EXISTS friends CASCADE', (err, res) => {
    if (err) {
      reject(Error('An error occurred trying to drop table friends. ', err));
    }
    if (res) {
      connecToDb(`CREATE TABLE friends(
                  id SERIAL PRIMARY KEY,
                  usersid SMALLINT NOT NULL,
                  friendswithid SMALLINT NOT NULL,
                  CONSTRAINT users FOREIGN KEY (usersid) REFERENCES users(id),
                  CONSTRAINT friendswith FOREIGN KEY (friendswithid) REFERENCES users(id),
                  UNIQUE(usersId, friendswithid)
                  )`, (error, response) => {
        if (error) {
          reject(Error('An error occurred trying to create table friends.', error));
        }
        if (response) {
          resolve('Table friends has been Created succesfully');
        }
      });
    }
  });
});

export default createFriendsTable;

