var log = require('./logger');
module.exports = function (app) {
  app.use(log);
}