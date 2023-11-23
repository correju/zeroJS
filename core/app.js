const http = require('http');
const { URL } = require('url');
const { Buffer } = require('buffer');
const methods = require('../config/methods')
const pathtoRegexp = require('../util/path-to-regexp');

const routes = methods.reduce((accumulator, currentValue) =>
  ({...accumulator, [currentValue]: []}), {});

const app = {
  create() {
    return http.createServer((req, res) => {
        // get url and parse
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
          const match = routes[method].find((route) => {
            const a = route.regexRoute.exec(pathname);
            return a;
          });
          if (!match) {
            res.writeHead(404)
            return res.end('not found')
          }
          match.callback(req, res)
          // res.end(method)

          // at this point, `body` has the entire request body stored in it as a string
          //send the response
          // res.writeHead(200, { 'Content-Type': 'application/json' });
          // res.end(JSON.stringify({
          //   pathname,
          //   method,
          //   query,
          //   headers,
          //   body,
          // }));
        });

    });
  },
}

methods.forEach((method) => {
  app[method] = (path, callback) => {
    const regexRoute =  pathtoRegexp(path)
    routes[method].push({regexRoute, callback})
  }
});

module.exports = app;
