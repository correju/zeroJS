const defaultErrorsObject = {
  400: (req, res) => {
    res.statusCode = 400;
    res.end('Bad Request');
  },
  401: (req, res) => {
    res.statusCode = 401;
    res.end('Unauthorized');
  },
  403: (req, res) => {
    res.statusCode = 403;
    res.end('Forbidden');
  },
  404: (req, res) => {
    res.statusCode = 404;
    res.end('Not Found');
  },
  405: (req, res) => {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  },
  408: (req, res) => {
    res.statusCode = 408;
    res.end('Request Timeout');
  },
  413: (req, res) => {
    res.statusCode = 413;
    res.end('Payload Too Large');
  },
  414: (req, res) => {
    res.statusCode = 414;
    res.end('URI Too Long');
  },
  429: (req, res) => {
    res.statusCode = 429;
    res.end('Too Many Requests');
  },
  500: (req, res) => {
    res.statusCode = 500;
    res.end('Internal Server Error');
  },
  501: (req, res) => {
    res.statusCode = 501;
    res.end('Not Implemented');
  },
  503: (req, res) => {
    res.statusCode = 503;
    res.end('Service Unavailable');
  },
};

module.exports = defaultErrorsObject;
