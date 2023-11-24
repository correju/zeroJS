const { Transform } = require('stream');
const { URL } = require('url');

const createParamParser = (req, res) => {
  const transform = new Transform({
    transform(chunk, enc, next) {
      next(null, chunk);
    },
    final(next) {
      const siteUrl = `https://${req.headers.host}${req.url}`;
      const myUrl = new URL(siteUrl);
      let query = {};
      myUrl.searchParams.forEach((value, name, searchParams) => {
        query[name] = value;
      });
      req.query = query;
      req.pathname = myUrl.pathname;
      next()
    }
  });
  return transform;
}

  module.exports = createParamParser;
