const dotenv = require('dotenv');
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
require("./config/database").connect();
const express = require('express');
const glob = require( 'glob' )
const path = require( 'path' );
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-response');
const authenticationHandler = require('../src/middleware/authentication');
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(authenticationHandler);

glob.sync('./src/routes/**/*.js').forEach((file) => {
  const route = require(path.resolve(file));
  app.use(route.base, route.router);
});

app.use(errorHandler);

module.exports = app