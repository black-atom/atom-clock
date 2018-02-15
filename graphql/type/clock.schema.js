const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
} = require('graphql');
const { addressType } = require('./address.schema');
const { getModel } = require('../../database/db');

const Address = getModel('Address');

const clockType = new GraphQLObjectType({
  name: 'ClockType',
  fields: {
    id: {
      type: GraphQLInt,
    },
    host: {
      type: GraphQLString,
    },
    companyId: {
      type: GraphQLString,
    },
    operator: {
      type: GraphQLString,
    },
    imeiChip: {
      type: GraphQLString,
    },
    numberSeal: {
      type: GraphQLString,
    },
    moduleVersion: {
      type: GraphQLString,
    },
    moduleNumber: {
      type: GraphQLString,
    },
    port: {
      type: GraphQLInt,
    },
    isUp: {
      type: GraphQLBoolean,
    },
    interval: {
      type: GraphQLInt,
    },
    errorCount: {
      type: GraphQLInt,
    },
    lastTested: {
      type: GraphQLString,
    },
    Address: {
      type: addressType,
      resolve: async ({ id }) => {
        const address = await Address.findOne({ where: { RelogioId: id } });
        return address;
      },
    },
  },
});

module.exports = {
  clockType,
};
