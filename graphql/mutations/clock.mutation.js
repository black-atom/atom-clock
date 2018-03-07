const { clockType } = require('../type/clock.schema');
const { clockInput } = require('./inputTypes');
const { getModel } = require('../../database/db');

const Relogio = getModel('Relogio');
const Address = getModel('Address');


const createClockMutation = {
  type: clockType,
  args: {
    clockInput: {
      type: clockInput,
    },
  },
  resolve: async (obj, { clockInput: ClockData }) => {
    const newClock = await Relogio.create(ClockData, { include: [Address] });
    return newClock;
  },
};

module.exports = {
  createClockMutation,
};
