/**
 * Primary file
 */
const app = require('../core/app')
const server = app.create()

app.get('/foo/:id/:name', (req, res, next) => {
  const query = req.query;
  res.send({...req.params, ...query});
});

//start the server
server.listen(3000, () => {
  console.log('the server is listen to port 3000')
})

