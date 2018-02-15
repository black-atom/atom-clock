const { getModel } = require('../../database/db');

const Relogio = getModel('Relogio');
const Address = getModel('Address');

const createClock = async (obj) => {
  const newClock = await Relogio.create(obj, { include: [Address] });
  return newClock;
};

module.exports = {
  createClock,
};
