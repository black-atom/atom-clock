const Sequelize = require('sequelize');
const { getDBConfig } = require('../config/DBConfig');
const Relogio = require('./models/relogio');
const Ping = require('./models/ping');

const {
  host, username, password, port, dialect,
} = getDBConfig();

const db = new Sequelize(dialect, username, password, {
  host,
  port,
  dialect,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

/** * Instantiate models ** */
const modelsSchema = [Relogio, Ping];
const modelInstances = modelsSchema.map(schema => schema(db));
modelInstances.forEach(modelInstance => modelInstance.associate(db.models));

db.authenticate()
  .then(() => {
    console.log('Successfully connected to the database!');
  })
  .then(() => {
    return db.sync({ force: false })
  })
  .catch(err => console.log(err));

const getModel = name => db.model(name);

module.exports = {
  db,
  getModel,
};
