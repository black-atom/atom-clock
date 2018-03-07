const graphql = require('graphql');
const { clockType } = require('../type/clock.schema');
const { getModel } = require('../../database/db');

const Relogio = getModel('Relogio');

const clockQuery = {
  type: clockType,
  args: {
    id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
  },
  resolve: async (obj, { id: relogioId }) => {
    try {
      const clock = await Relogio.findById(relogioId);
      return clock;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = {
  clockQuery,
};
