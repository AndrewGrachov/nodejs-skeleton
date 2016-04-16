const path = require('path');
const fs = require('fs');

function loadRoutes(app) {
  fs.readdirSync(__dirname).map(file=> {
    /* If its the current file ignore it */
    if (file === 'index.js') return;
    if (file === 'root.js') {
      app.use('/', require(__dirname + '/'.file));
      return;
    }

    let moduleName = file.split('.');
    if (moduleName.pop() == '.js') {
      app.use(moduleName.join('.'), require(__dirname + '/'.file));
    }
  });
}


module.exports = {
  loadRoutes: loadRoutes
};