'use strict';
const express = require('express'),
  config = require('config');
const app = express();
app.listen(config.app.port);
