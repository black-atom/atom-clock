const { getConfig } = require('./config');

const getDBConfig = getConfig({
  development: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    dialect: 'postgres',
  },

  test: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    dialect: 'postgres',
  },

  production: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dialect: 'postgres',
  },
});

module.exports = {
  getDBConfig,
};
