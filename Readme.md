# Simple Server Tool

This is a simple server tool that mimics the functionality of Express.js. It allows you to create routes and handle HTTP requests.

## Installation

To run the code please use the core app module
1. create the server
1. Start listening request in the desire port


```javascript
const app = require('../core/app')
const server = app.create()
server.listen(3000, () => {
  console.log('the server is listen to port 3000')
})
```

## How to listen to specific routes

```javascript
app.get('/desire-route', (req, res) => {
  // Desire code to process
})
app.put('/desire-route', (req, res) => {
  // Desire code to process
})
app.post('/desire-route', (req, res) => {
  // Desire code to process
})
app.delete('/desire-route', (req, res) => {
  // Desire code to process
})
app.patch('/desire-route', (req, res) => {
  // Desire code to process
})
```

## How to respond the request
```javascript
app.get('/desire-route', (req, res) => {
  // returns header Content-Type application/json
  res.send(1)
});

app.get('/desire-route', (req, res) => {
  // returns header Content-Type application/json
  res.send(true)
});

app.get('/desire-route', (req, res) => {
  // returns header Content-Type application/json
  res.send({hello: 'world'})
});

app.get('/desire-route', (req, res) => {
  // returns header Content-Type text/html
  res.send('text')
});
```

## How to receive params in URL
```javascript
app.get('/foo/:id/:name', (req, res) => {
  const {id, name } = req.params;
  res.send({id, name})
});
```

## How to receive query params
If the request url is /foo/1/julian?p=1
```javascript
app.get('/foo/:id/:name', (req, res) => {
  // The p value is "1"
  res.send({...req.params, req.query})
  // The response is {id: 1, name: 'Julian', p: "1"}
});
```
**Note: The query params will always be strings**
