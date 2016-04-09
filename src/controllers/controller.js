var healthController = require('./healthController');

module.exports = function (app) {
  healthController(app);
}