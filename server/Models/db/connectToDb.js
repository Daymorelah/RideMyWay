
import { Pool } from 'pg';
import config from '../../Config/config';

const pool = new Pool(config.development);


const connectToDb = (text, params, callback) => pool.query(text, params, callback);

export default connectToDb;
