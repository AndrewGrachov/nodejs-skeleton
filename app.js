'use strict';
const express = require('express'),
  config = require('config'),
  controllers = require('./src/controllers/controller');

const app = express();
const routes = require('./src/routes');


app.listen(config.app.port);
console.log('Listening at:', config.app.port);
app.use(function (req, res, next) {
  let logMessage = {
    method: req.method,
    path: req.path,
    time: new Date()
  }
  console.log(logMessage);
  next();
});

routes.loadRoutes(app);
