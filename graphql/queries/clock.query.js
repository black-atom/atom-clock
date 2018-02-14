const graphql = require('graphql');
const { clockType } = require('../type/clock.schema');

const clockQuery = {
  type: clockType,
  args: {
    id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
  },
  resolve: (obj, args) => console.log(args),
};

module.exports = {
  clockQuery,
};
