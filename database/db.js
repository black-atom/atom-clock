const Sequelize = require('sequelize');
const { getDBConfig } = require('../config/DBConfig');
const Relogio = require('./models/relogio');
const Ping = require('./models/ping');
const Address = require('./models/address');

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
  logging: false,
});

/** * Instantiate models ** */
const modelsSchema = [Relogio, Ping, Address];
const modelInstances = modelsSchema.map(schema => schema(db));
modelInstances.forEach(modelInstance => modelInstance.associate(db.models));

db.authenticate()
  .then(() => {
    console.log('Successfully connected to the database!');
  })
  .then(() => db.sync({ force: false }))
  .catch(err => console.log(err));

const getModel = name => db.model(name);
const isDBReady = async (force = false) => {
  try {
    await db.authenticate();
    await db.sync({ force });
    return true;
  } catch (error) {
    return false;
  }
};

const getTransaction = () => db.transaction();

module.exports = {
  db,
  getTransaction,
  getModel,
  isDBReady,
};
