const express = require('express');
const graphql = require('graphql').graphql;  // eslint-disable-line
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');

const { schema } = require('./graphql');

const {
  jwtSecret,
  jwtRequired,
  testeUser,
} = require('./config/auth.config')();

const app = express();

app.use(jwt({
  secret: jwtSecret,
  credentialsRequired: jwtRequired,
}));

app.use((req, res, next) => {
  req.user = req.user || {};
  req.user = (req.user._doc !== undefined) ? // eslint-disable-line no-underscore-dangle
    req.user._doc : testeUser; // eslint-disable-line no-underscore-dangle

  next();
});

app.use('/graphql', graphqlHTTP({ schema, pretty: true, graphiql: true }));


module.exports = app;
