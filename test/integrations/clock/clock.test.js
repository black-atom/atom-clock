const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');
const { isDBReady } = require('../../../database/db');
const { createClock } = require('../../utils/utils');

chai.use(chaiHttp);
const server = chai.request(app);

const clockTest = {
  host: 'ox1.modrp.com',
  companyId: '1',
  operator: 'VIVO',
  imeiChip: '78974578971654',
  numberSeal: '25252525',
  moduleVersion: 'Version 1',
  moduleNumber: '46546578',
  port: 3000,
  Address: {
    city: 'Rua São Pedro',
    street: 'S B Campo',
    number: 4544,
    zipCode: '0689787984',
    state: 'SP',
    longitude: 45646465,
    lagitude: -45665764,
  },
};

beforeEach(async () => {
  await isDBReady(true);
});

describe('Test of integrations to the api graphql', () => {
  it('It should response the post method add new clock', async () => {
    const clockToTestMutation = `
      mutation{
        createClock(
          clockInput:{
            host: "ox1.modrp.com"
            companyId: "1"
            operator: "VIVO"
            imeiChip: "78974578971654"
            numberSeal: "25252525"
            moduleVersion: "Version 1"
            moduleNumber: "46546578"
            port: 3000
            Address: {
              city: "Rua São Pedro"
              street: "S B Campo"
              number: 4544
              zipCode: "0689787984"
              state: "SP"
              longitude: 45646465
              lagitude: -45665764
            }
          }
        ){
          host
          companyId
          operator
          imeiChip
          numberSeal
          moduleVersion
          moduleNumber
          port
          Address {
            city
            street
            number
            zipCode
            state
            longitude
            lagitude
        }
        }
      }
      `;
    const response = await server.post('/graphql').send({ query: clockToTestMutation });
    expect(response.body.data.createClock).toEqual(clockTest);
  });

  it('It should response the get method all clocks', async () => {
    const query = `
      query {
        clocks {
          data {
            host
          }
        }
      }
    `;
    const response = await server.get('/graphql').query({ query });
    expect(response.body.data.clocks.data).toEqual([]);
  });

  it('It should response the get method a clock', async () => {
    await createClock(clockTest);
    const query = `
    query {
      clock(id:1) {
        host
        companyId
        operator
        imeiChip
        numberSeal
        moduleVersion
        moduleNumber
        port
        Address {
          city
          street
          number
          zipCode
          state
          longitude
          lagitude
      }
    }
    }
  `;
    const response = await server.get('/graphql').query({ query });
    expect(response.body.data.clock).toEqual(clockTest);
  });
});
