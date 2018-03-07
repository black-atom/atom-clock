const getEnv = env => env || process.env.NODE_ENV || 'test';
const getConfig = config => env => config[getEnv(env)];

module.exports = {
  getConfig,
};
