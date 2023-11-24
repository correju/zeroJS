const http = require('http');
const { URL } = require('url');
const { Buffer } = require('buffer');
const { routesCallback, routeMatch }  = require('./route');
const methods = require('../config/methods');
const extendResponse = require('./response');

const app = {
  create() {
    return http.createServer((req, res) => {
        // get url and parse
        extendResponse(res);
        const siteUrl = `https://${req.headers.host}${req.url}`;

        //get the path
        const myUrl = new URL(siteUrl);
        const pathname = myUrl.pathname

        // get HTTP method
        const method = req.method.toLowerCase();
        // get search params
        let query = {};
        myUrl.searchParams.forEach((value, name, searchParams) => {
          query[name] = value;
        });

        // Get the headers as an object
        const headers = req.headers;

        // Get the body
        let buffer = [];
        req.on('data', (chunk) => {
          buffer.push(chunk);
        }).on('end', () => {
          const body = Buffer.concat(buffer).toString();
          const match = routeMatch({req, res, method, pathname});
          if (!match) {
            res.writeHead(404)
            return res.end('not found')
          }
          match.callback(req, res)
        });

    });
  },
}

methods.forEach((method) => {
  app[method] = routesCallback(method);
});

module.exports = app;
