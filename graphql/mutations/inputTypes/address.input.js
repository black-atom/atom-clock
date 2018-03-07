const {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const addressInput = new GraphQLInputObjectType({
  name: 'addressInput',
  fields: {
    street: {
      type: GraphQLNonNull(GraphQLString),
    },
    city: {
      type: GraphQLNonNull(GraphQLString),
    },
    complement: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLNonNull(GraphQLString),
    },
    zipCode: {
      type: GraphQLNonNull(GraphQLString),
    },
    number: {
      type: GraphQLNonNull(GraphQLInt),
    },
    longitude: {
      type: GraphQLNonNull(GraphQLInt),
    },
    lagitude: {
      type: GraphQLNonNull(GraphQLInt),
    },
  },
});

module.exports = {
  addressInput,
};
