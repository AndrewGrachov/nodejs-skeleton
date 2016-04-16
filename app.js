'use strict';
const express = require('express'),
  config = require('config');
const app = express();
const routes = require('./src/routes');
const winston = require('winston');



app.listen(config.app.port);


routes.loadRoutes(app);

const winstonStream = {
  write: function(message, encoding){
    winston.info(message);
  }
};
app.use(express.logger({stream:winstonStream}));