const express = require('express');
const graphql = require('graphql').graphql;  // eslint-disable-line
const graphqlHTTP = require('express-graphql');

const { schema } = require('./graphql');

const app = express();

app.use('/graphql', graphqlHTTP({ schema, pretty: true, graphiql: true }));


module.exports = app;
