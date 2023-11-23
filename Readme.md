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

## How tollisten to specific routes

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