'use strict';
const express = require('express'),
  config = require('config'),
  controllers = require('./src/controllers/controller');

const app = express();
const routes = require('./src/routes');


app.listen(config.app.port);
console.log('Listening at:', config.app.port);


routes.loadRoutes(app);
