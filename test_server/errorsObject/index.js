const errorsObject = {
  404: (req, res) => {
    res.statusCode(404)
    res.end('Not Found');
  },
  500: (req, res) => {
    res.statusCode(500);
    res.end('Internal Server Error');
  },
};

module.exports = errorsObject;
