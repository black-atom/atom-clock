const { getConfig } = require('./config');

const testeUser = {
  testUser: {
    _id: '59d28dc25806650001477799',
    nome: 'User Test',
  },
};

const getAuthConfig = getConfig({
  development: {
    jwtSecret: 'realponto',
    jwtRequired: false,
    testeUser,
  },

  test: {
    jwtSecret: 'realponto',
    jwtRequired: false,
    testeUser,
  },

  production: {
    jwtSecret: process.env.JWT_SECRET || 'realponto',
    jwtRequired: true,
    testUser: null,
  },
});

module.exports = getAuthConfig;
