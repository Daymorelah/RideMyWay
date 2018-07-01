
import connecToDb from './db/connectToDb';

const createRequestsTable = () => {
  connecToDb('DROP TABLE IF EXISTS requests CASCADE', (err, res) => {
    if (err) {
      console.log('An error occurred trying to drop table requests. ', err);
    }
    if (res) {
      console.log('Table requests has been dropped succesfully');
      connecToDb('CREATE TABLE requests(' +
                  'id SERIAL PRIMARY KEY,' +
                  'name VARCHAR(255) NOT NULL,' +
                  'fk_users_id SMALLINT NOT NULL,' +
                  'CONSTRAINT fk_user FOREIGN KEY (fk_users_id) REFERENCES users(id),' +
                  'fk_rideoffer_id SMALLINT NOT NULL,' +
                  'CONSTRAINT fk_rideoffer FOREIGN KEY (fk_rideoffer_id) REFERENCES ride_offers(id)' +
                  ')', (error, responce) => {
        if (error) {
          console.log('An error occurred trying to create table requests.', error);
        }
        if (responce) {
          console.log('Table requests has been Created succesfully');
        }
      });
    }
  });
};

export default createRequestsTable;
