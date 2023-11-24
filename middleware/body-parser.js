const { Transform } = require('stream')

const bodyParser = (body) => {
  // Process the body here
  return body;
};

const createBodyParser = (req, res) => {
  let buffer = [];
  const transform = new Transform({
    transform(chunk, enc, next) {
      buffer.push(chunk);
      next();
    },
    final(next) {
      const body = Buffer.concat(buffer);
      this.push(Buffer.from('1'));
      next()
    }
  });
  return transform;
}

  module.exports = createBodyParser;
