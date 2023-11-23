/**
 * Primary file
 */
const app = require('../core/app')
const server = app.create()

app.get('/foo/bar2', (req, res) => {
  res.end('hello world');
});


app.get('/foo/:id', (req, res) => {
  res.end('second endpoint');
});

//start the server
server.listen(3000, () => {
  console.log('the server is listen to port 3000')
})

