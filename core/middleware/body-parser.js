const { Transform } = require('stream')
const { URLSearchParams } = require('url');

const bodyParser = {
  'application/json': (rawData) =>  JSON.parse(rawData),
  'application/x-www-form-urlencoded': (rawData) =>
    Object.fromEntries(new URLSearchParams(rawData)),
  default: (rawData) => rawData,
};

const createBodyParser = (req, res) => {
  let buffer = [];
  const transform = new Transform({
    transform(chunk, enc, next) {
      buffer.push(chunk);
      next();
    },
    final(next) {
      const rawData = Buffer.concat(buffer);
      const contentType = req.headers['content-type'];
      const bodyParserFunction = bodyParser[contentType] ?? bodyParser['application/json'];
      try {
        body = bodyParserFunction(rawData);
        req.body = body;
        next()
      } catch (error) {
        next(400);
      }
    }
  });
  return transform;
}

  module.exports = createBodyParser;
