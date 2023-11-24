const http = require('http');
const { Buffer } = require('buffer');
const { routesCallback }  = require('./route');
const methods = require('../config/methods');

const middleware = require('../middleware');
const app = {
  create(errorsObject = {}) {
    return http.createServer(middleware.main(errorsObject));
  },
}

methods.forEach((method) => {
  app[method] = routesCallback(method);
});

module.exports = app;
