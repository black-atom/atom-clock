const { getConfig } = require('./config');

const getPingConfig = getConfig({
  development: {
    interval: 2000,
    alertAt: 5,
  },

  test: {
    interval: 2000,
    alertAt: 5,
  },

  production: {
    interval: 2000,
    alertAt: 5,
  },
});

module.exports = {
  getPingConfig,
};
