// import express which this time is a function used to create
// an Express application and stored in the app variable
const express = require('express')
const app = express()

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  // send method of the response object is used to send the response
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  // the json method of the response object can be used to send a JSON response
  response.json(notes)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)