
import { Pool } from 'pg';
import config from '../../Config/config';

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}
if (process.env.NODE_ENV === 'development') {
  pool = new Pool(config.development);
}
if (process.env.NODE_ENV === 'test') {
  pool = new Pool(config.test);
}

const connectToDb = (text, params, callback) => {
  pool.query(text, params, callback);
};

export default connectToDb;
