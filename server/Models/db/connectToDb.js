
import { Pool } from 'pg';
import config from '../../Config/config';

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool(config.development);
}
if (process.env.NODE_ENV === 'production') {
  pool = new Pool(process.env[config.production.use_env_variable]);
}

const connectToDb = (text, params, callback) => pool.query(text, params, callback);

export default connectToDb;
