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
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// route for fetching a single resource
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  // if note is not found, note will be undefined and evalute to false in JS
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// route for deleting a resource
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// route for creating a new resource
app.use(express.json()) // middleware for parsing JSON bodies
// Without the json-parser, the body property would be undefined. 
// The json-parser takes the JSON data of a request, transforms it into
// a JavaScript object and then attaches it to the body property of 
// the request object before the route handler is called.

const generateId = () => {
  const maxId = notes.length > 0
    // get the maximum id in the notes array
    // note to spread operator (...) which expands the array into a list of values
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)