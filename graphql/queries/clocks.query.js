const {
  GraphQLInt,
} = require('graphql');
const { clockType } = require('../type/clock.schema');
const { getModel } = require('../../database/db');
const { createLazyLoadingType } = require('../type/lazyloading.type');

const Relogio = getModel('Relogio');

const clocksQuery = {
  type: createLazyLoadingType(clockType),
  args: {
    skip: {
      type: GraphQLInt,
      defaultValue: 0,
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 25,
    },
  },
  resolve: async (obj, { skip, limit }) => {
    try {
      const clock = await Relogio.findAll({
        offset: skip,
        limit,
      });
      const count = await Relogio.count();
      return {
        data: clock,
        count,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = {
  clocksQuery,
};
