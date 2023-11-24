const bodyParser = require('./body-parser');
const queryParser = require('./query-parser');
const handler = require('./handler');
const util = require('util');
const { pipeline } = require('stream/promises')
const extendResponse = require('../response');
const defaultErrorsObject = require('./defaultError');
const [getMiddleWares, setMiddleWares ] = ((middlewareArray) =>
    [() => middlewareArray, (middleware) => middlewareArray.push(middleware)])([]);

const main = (errorsObject) => async (req, res) => {
  const middlewares = getMiddleWares();
  const middlewareForPipeline = middlewares.map((middleware) => middleware(req, res));

  extendResponse(res);
  try {
    await pipeline(
      req,
      bodyParser(req, res),
      queryParser(req, res),
      ...middlewareForPipeline,
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
  setMiddleWares,
};
