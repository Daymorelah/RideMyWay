

import connecToDb from './db/connectToDb';

const createFriendsTable = () => {
  connecToDb('DROP TABLE IF EXISTS friends CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table friends. ', err);
    }
    if (res) {
      console.log('Table friends has been dropped succesfully');
      connecToDb(`CREATE TABLE friends(
                  id SERIAL PRIMARY KEY,
                  usersid SMALLINT NOT NULL,
                  friendswithid SMALLINT NOT NULL,
                  CONSTRAINT users FOREIGN KEY (usersid) REFERENCES users(id),
                  CONSTRAINT friendswith FOREIGN KEY (friendswithid) REFERENCES users(id),
                  UNIQUE(usersId, friendswithid)
                  )`, (error, response) => {
        if (error) {
          console.log('An error occurred trying to create table friends.', error);
        }
        if (response) {
          console.log('Table friends has been Created succesfully');
        }
      });
    }
  });
};

export default createFriendsTable;

