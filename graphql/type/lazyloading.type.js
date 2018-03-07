const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} = require('graphql');


const createLazyLoadingType = (graphQlType) => {
  const lazyLoadingType = new GraphQLObjectType({
    name: 'LadyLoadingType',
    fields: {
      data: { type: GraphQLList(graphQlType) },
      count: { type: GraphQLInt },
    },
  });

  return lazyLoadingType;
};

module.exports = {
  createLazyLoadingType,
};
