const { GraphQLObjectType } = require('graphql');
const { clockQuery } = require('./clock.query');

const query = new GraphQLObjectType({
  name: 'query',
  description: 'This query return a clock',
  fields: {
    clock: clockQuery,
  },
});

module.exports = {
  query,
};
