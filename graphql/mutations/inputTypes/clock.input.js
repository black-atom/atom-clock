const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
} = require('graphql');
const { addressInput } = require('./address.input');

const clockInput = new GraphQLInputObjectType({
  name: 'ClockMutationInput',
  fields: {
    host: {
      type: GraphQLNonNull(GraphQLString),
    },
    port: {
      type: GraphQLNonNull(GraphQLInt),
    },
    interval: {
      type: GraphQLInt,
    },
    companyId: {
      type: GraphQLNonNull(GraphQLString),
    },
    operator: {
      type: GraphQLNonNull(GraphQLString),
    },
    imeiChip: {
      type: GraphQLNonNull(GraphQLString),
    },
    numberSeal: {
      type: GraphQLNonNull(GraphQLString),
    },
    moduleVersion: {
      type: GraphQLNonNull(GraphQLString),
    },
    moduleNumber: {
      type: GraphQLNonNull(GraphQLString),
    },
    Address: {
      type: GraphQLNonNull(addressInput),
    },
  },
});

module.exports = {
  clockInput,
};
