const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
} = require('graphql');
const { addressType } = require('./address.schema');
const { companyType } = require('./company.schema');
const { getModel } = require('../../database/db');

const Address = getModel('Address');
const { companyRequest } = require('../../utils/requestCompany');

const clockType = new GraphQLObjectType({
  name: 'ClockType',
  fields: {
    id: {
      type: GraphQLInt,
    },
    host: {
      type: GraphQLString,
    },
    companyId: {
      type: GraphQLString,
    },
    operator: {
      type: GraphQLString,
    },
    imeiChip: {
      type: GraphQLString,
    },
    numberSeal: {
      type: GraphQLString,
    },
    moduleVersion: {
      type: GraphQLString,
    },
    moduleNumber: {
      type: GraphQLString,
    },
    port: {
      type: GraphQLInt,
    },
    isUp: {
      type: GraphQLBoolean,
    },
    interval: {
      type: GraphQLInt,
    },
    errorCount: {
      type: GraphQLInt,
    },
    lastTested: {
      type: GraphQLString,
    },
    Address: {
      type: addressType,
      resolve: async ({ id }) => {
        try {
          const address = await Address.findOne({ where: { RelogioId: id } });
          return address;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    Company: {
      type: companyType,
      resolve: async ({ companyId }, args, request) => {
        try {
          const token = request.headers.authorization || '';
          return await companyRequest(companyId)(token);
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  },
});

module.exports = {
  clockType,
};
