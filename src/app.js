const dotenv = require('dotenv');
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
require("./config/database").connect();
const express = require('express');
const glob = require( 'glob' )
const path = require( 'path' );
const bodyParser = require('body-parser');
const error = require('../src/middleware/error');
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

glob.sync('./src/routes/**/*.js').forEach((file) => {
  const route = require(path.resolve(file));
  app.use(route.base, route.router);
  //
});

app.use(error.errorResponse);

module.exports = app