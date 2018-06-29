
import { Pool } from 'pg';
import config from '../../Config/config';

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
  pool = new Pool(config.development);
}

const connectToDb = (text, params, callback) => pool.query(text, params, callback);

export default connectToDb;
