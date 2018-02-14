const graphql = require('graphql');
const { addressType } = require('./address.schema');

const clockType = new graphql.GraphQLObjectType({
  name: 'ClockType',
  fields: {
    id: {
      type: graphql.GraphQLInt,
    },
    host: {
      type: graphql.GraphQLString,
    },
    companyId: {
      type: graphql.GraphQLString,
    },
    operator: {
      type: graphql.GraphQLString,
    },
    imeiChip: {
      type: graphql.GraphQLString,
    },
    numberSeal: {
      type: graphql.GraphQLString,
    },
    moduleVersion: {
      type: graphql.GraphQLString,
    },
    moduleNumber: {
      type: graphql.GraphQLString,
    },
    port: {
      type: graphql.GraphQLInt,
    },
    isUp: {
      type: graphql.GraphQLBoolean,
    },
    interval: {
      type: graphql.GraphQLInt,
    },
    errorCount: {
      type: graphql.GraphQLInt,
    },
    lastTested: {
      type: graphql.GraphQLString,
    },
    address: {
      type: addressType,
    },
  },
});

module.exports = {
  clockType,
};
