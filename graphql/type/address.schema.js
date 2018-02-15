const graphql = require('graphql');

const addressType = new graphql.GraphQLObjectType({
  name: 'addressClock',
  fields: {
    id: {
      type: graphql.GraphQLInt,
    },
    RelogioId: {
      type: graphql.GraphQLInt,
    },
    street: {
      type: graphql.GraphQLString,
    },
    city: {
      type: graphql.GraphQLString,
    },
    complement: {
      type: graphql.GraphQLString,
    },
    state: {
      type: graphql.GraphQLString,
    },
    zipCode: {
      type: graphql.GraphQLString,
    },
    number: {
      type: graphql.GraphQLString,
    },
    longitude: {
      type: graphql.GraphQLInt,
    },
    lagitude: {
      type: graphql.GraphQLInt,
    },
  },
});

module.exports = {
  addressType,
};
