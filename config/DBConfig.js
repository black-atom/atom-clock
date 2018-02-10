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
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    dialect: 'postgres',
  },
});

module.exports = {
  getDBConfig,
};
