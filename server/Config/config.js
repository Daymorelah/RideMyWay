

const dbConfigurations = {
  development: {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'ride_my_way_db',
    password: 'andelabootcamp24',
    port: 5432,
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000,
  },
  test: {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'ride_my_way_test_db',
    password: 'andelabootcamp24',
    port: 5432,
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000,
  },
};

export default dbConfigurations;
