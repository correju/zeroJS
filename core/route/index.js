const pathtoRegexp = require('../util/path-to-regexp');
const methods = require('../../config/methods');
const routes = methods.reduce((accumulator, currentValue) =>
  ({...accumulator, [currentValue]: []}), {});

const routesCallback = (method) => (path, callback) => {
  const keys = [];
  const regexRoute = pathtoRegexp(path, keys);
  routes[method].push({regexRoute, callback, keys});
}

const routeMatch = ({req, res, pathname, method}) => routes[method].find((route) => {
  const match = route.regexRoute.exec(pathname);
  const keys = route.keys;

  if (!match) return false;
  const params = {};
  for (let i = 1; i < match.length; i++) {
    const key = keys[i - 1];
    const prop = key.name;
    const value = decode_param(match[i]);
    if (value !== undefined) {
      params[prop] = value;
    }
  }
  req.params = params;
  return match;
});
/**
 * Extracted from express layer
 * @param {*} value
 * @returns value
 *
 */
const decode_param = (value) => {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }
  try {
    return decodeURIComponent(value);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = 'Failed to decode param \'' + val + '\'';
      err.status = err.statusCode = 400;
    }
    throw err;
  }
}

module.exports = {
  routesCallback,
  routeMatch,
};
