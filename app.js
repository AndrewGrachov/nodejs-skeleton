'use strict';
const express = require('express'),
  config = require('config'),
  controllers = require('./src/controllers/controller');

const app = express();
const middleware = require('./src/middleware/middleware');

middleware(app);
controllers(app);

app.listen(config.app.port);