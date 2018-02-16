const {
  GraphQLString,
  GraphQLObjectType,
} = require('graphql');

const companyType = new GraphQLObjectType({
  name: 'companyClock',
  fields: {
    id: {
      type: GraphQLString,
    },
    nome_razao_social: {
      type: GraphQLString,
    },
    cnpj_cpf: {
      type: GraphQLString,
    },
  },
});

module.exports = {
  companyType,
};
