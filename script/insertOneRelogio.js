const {
  getModel,
  isDBReady,
} = require('../database/db.js');

const Relogio = getModel('Relogio');

isDBReady().then(() => Relogio.create({
  host: '192.168.15.53',
  port: 3000,
  interval: 30000
}));
