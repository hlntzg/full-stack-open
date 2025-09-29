// imports Node's built-in web server module
const http = require('http')

// 1 - createServer method of the http module to create a new web server
// 2 - every time an HTTP request is made to the server, the provided callback function is executed
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

// 3 - bind the http server assigned to the app variable to listen on port 3001 for incoming requests
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)