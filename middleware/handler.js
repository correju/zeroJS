const { Transform } = require('stream');
const { routeMatch } = require('../core/route/');

const createHandler= (req, res) => {
  const transform = new Transform({
    transform(chunk, enc, next) {
      next(null, chunk);
    },
    final(next) {
      const method = req.method.toLowerCase();
      const pathname = req.pathname;
      const match = routeMatch({req, res, method, pathname});
      if (!match) return next(404)
      match.callback(req, res, next)
    }
  });
  return transform;
}

  module.exports = createHandler;
