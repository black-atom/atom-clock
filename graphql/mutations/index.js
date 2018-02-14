const { GraphQLObjectType } = require('graphql');
const { createClockMutation } = require('./clock.mutation');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createClock: createClockMutation,
  },
});

module.exports = {
  mutation,
};
