import dotenv from 'dotenv';

dotenv.config();

const dbConfigurations = {
  development: {
    user: process.env.DB_CONFIG_USERNAME,
    host: process.env.DB_CONFIG_HOST,
    database: process.env.DB_CONFIG_DATABASE,
    password: process.env.DB_CONFIG_PASSWORD,
    port: process.env.DB_CONFIG_PORT,
    max: process.env.DB_CONFIG_MAX, // max number of connection can be open to database
    idleTimeoutMillis: process.env.DB_CONFIG_IDLE_TIMEOUT_MILLIS,
  },
  test: {
    user: process.env.postgres,
    host: process.env.DB_CONFIG_HOST,
    database: process.env.DB_CONFIG_TEST_DATABASE,
    password: process.env.DB_CONFIG_PASSWORD,
    port: process.env.DB_CONFIG_PORT,
    max: process.env.DB_CONFIG_MAX, // max number of connection can be open to database
    idleTimeoutMillis: process.env.DB_CONFIG_IDLE_TIMEOUT_MILLIS,
  },
};

export default dbConfigurations;
