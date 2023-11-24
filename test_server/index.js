/**
 * Primary file
 */
const app = require('../core/app')
const server = app.create()

app.get('/foo/:id/:name', (req, res) => {
  res.send(req.params);
});

app.get('/foo/bar2', (req, res) => {
  res.end('hello world');
});


//start the server
server.listen(3000, () => {
  console.log('the server is listen to port 3000')
})

