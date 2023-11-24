const bodyParser = require('./body-parser');
const queryParser = require('./query-parser');
const handler = require('./handler');
const util = require('util');
const { pipeline } = require('stream/promises')
const extendResponse = require('../core/response');
const defaultErrorsObject = require('./defaultError');
const [getMiddleWareArray, setMiddleWareArray ] = ((middlewareArray) =>
    [() => middlewareArray, (middleware) => middlewareArray.push(middleware)])([]);

const fixedMiddlewares = [];

const main = (errorsObject) => async (req, res) => {
  const middlewares = getMiddleWareArray();
  extendResponse(res);
  try {
    await pipeline(
      req,
      bodyParser(req, res),
      queryParser(req, res),
      handler(req, res)
    );
  } catch (error) {
    errorsMergeObject = {...defaultErrorsObject, ...errorsObject};
    const errorHandler = errorsMergeObject[error] ?? errorsMergeObject[500];
    errorHandler(req, res);
  }
};

module.exports = {
  main,
  getMiddleWareArray,
  setMiddleWareArray,
};
