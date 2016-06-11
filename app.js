'use strict';
var opbeat;
if (process.env.NODE_ENV === 'development') {
  opbeat = require('opbeat').start();
}

const express = require('express'),
  config = require('config'),
  controllers = require('./src/controllers/controller'),
  winston = require('winston'),
  mongodb = require('mongodb'),
  dbDriver = require('./dbDriver');

const MongoClient = mongodb.MongoClient;

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

app.get('/error', function (req, res, next) {
  return next(new Error("This throws error"));
});
// Connection URL
var url = config.db.url;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  dbDriver.connect(db);
  console.log("Connected correctly to server");
  routes.loadRoutes(app);
  if (opbeat) {
    app.use(opbeat.middleware.express())
  }
});


