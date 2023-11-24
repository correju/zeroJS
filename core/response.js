const extendResponse = (res) => {
  res.send = send(res);
}

const send = (res) => (body) => {
  switch (typeof body) {
    // string defaulting to html
    case 'string':
      res.setHeader('Content-Type', 'text/html');
      res.end(body);
      break
    case 'boolean':
    case 'number':
    case 'object':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
  }
};

module.exports = extendResponse;
