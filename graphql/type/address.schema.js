const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
} = require('graphql');

const addressType = new GraphQLObjectType({
  name: 'addressClock',
  fields: {
    id: {
      type: GraphQLInt,
    },
    RelogioId: {
      type: GraphQLInt,
    },
    street: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    complement: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    zipCode: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLInt,
    },
    longitude: {
      type: GraphQLFloat,
    },
    lagitude: {
      type: GraphQLFloat,
    },
  },
});

module.exports = {
  addressType,
};
