
import { Pool } from 'pg';
import config from '../../Config/config';

let pool;
console.log(`We are in the ${process.env.NODE_ENV} environment`);

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

const connectToDb = (text, params, callback) => pool.query(text, params, callback);

export default connectToDb;
