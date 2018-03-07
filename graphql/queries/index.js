const { GraphQLObjectType } = require('graphql');
const { clockQuery } = require('./clock.query');
const { clocksQuery } = require('./clocks.query');


const query = new GraphQLObjectType({
  name: 'query',
  description: 'This query return a clock',
  fields: {
    clock: clockQuery,
    clocks: clocksQuery,
  },
});

module.exports = {
  query,
};
