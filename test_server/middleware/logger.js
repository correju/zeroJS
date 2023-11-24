const { Transform } = require('stream');

const createLogger= (req, res) => {
  const transform = new Transform({
    transform(chunk, enc, next) {
      next(null, chunk);
    },
    final(next) {
      // process.stdout.write(Buffer.from(`${req.method} ${req.url} \n`));
      console.log(`${req.method} ${req.url}`);
      next();
    }
  });
  return transform;
}

  module.exports = createLogger;
