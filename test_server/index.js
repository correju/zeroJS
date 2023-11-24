/**
 * Primary file
 */
const app = require('../core/app')
const createLogger = require('./middleware/logger')

app.use(createLogger);

const server = app.create()

app.get('/foo/:id/:name', (req, res, next) => {
  const { query, params } = req;
  res.send({ ...params, ...query });
});

app.post('/foo/:id/:name', (req, res, next) => {
  const { query, body, params } = req;
  res.send({ ...params, ...query, ...body });
});

//start the server
server.listen(3000, () => {
  console.log('the server is listen to port 3000');
})

