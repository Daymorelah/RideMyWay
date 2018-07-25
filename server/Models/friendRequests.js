
import connecToDb from './db/connectToDb';

const createFriendRequestsTable = () => {
  connecToDb('DROP TABLE IF EXISTS friendRequests CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table friendRequests. ', err);
    }
    if (res) {
      console.log('Table friendRequests has been dropped succesfully');
      connecToDb(`CREATE TABLE friendRequests(
                  id SERIAL PRIMARY KEY,
                  userthataskedid SMALLINT NOT NULL,
                  userthatdecidesid SMALLINT NOT NULL,
                  name VARCHAR(255) NOT NULL,
                  CONSTRAINT userthatasked FOREIGN KEY (userthataskedid) REFERENCES users(id),
                  CONSTRAINT userthatdecides FOREIGN KEY (userthatdecidesid) REFERENCES users(id),
                  UNIQUE(userthataskedid, userthatdecidesid)
                  )`, (error, response) => {
        if (error) {
          console.log('An error occurred trying to create table friendRequests.', error);
        }
        if (response) {
          console.log('Table friendRequests has been Created succesfully');
        }
      });
    }
  });
};

export default createFriendRequestsTable;

