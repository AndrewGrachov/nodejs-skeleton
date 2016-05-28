'use strict';
const express = require('express'),
  config = require('config'),
  controllers = require('./src/controllers/controller'),
  winston = require('winston');

var Logstash = require('logstash-client');

var logstash = new Logstash({
  type: 'udp', // udp, tcp, memory
  host: '79.124.76.230',
  port: 6000
});

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
  //winston.log(logMessage);
  logstash.send(logMessage);
  next();
});

routes.loadRoutes(app);
