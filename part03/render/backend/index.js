// import express which this time is a function used to create
// an Express application and stored in the app variable

// It's important that dotenv gets imported before the note model is imported. 
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')

const app = express()

// const username = 'fullstack'
// const password = process.argv[2]
// const url = `mongodb+srv://${username}:${password}@cluster0.2xgojtk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// MongoDB connection (from env var passed in CLI)
const mongoUrl = process.env.MONGODB_URI
console.log('Connecting to', mongoUrl)


mongoose.set('strictQuery',false)
mongoose.connect(mongoUrl)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })
// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     // _id property of Mongoose is in fact an object so we convert it to string
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// middleware to parse incoming JSON requests
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  // response.json(notes)
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// route for fetching a single resource
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

// route for deleting a resource
// Mongoose's findById method
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

// route for creating a new resource
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// handler of requests made to unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// use the PORT environment variable if it exists, otherwise use port 3001
const PORT =  process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})