require('dotenv').config()
const express = require('express');
const Person = require('./models/person')

const app = express();

// initial data
let persons = []

// MongoDB connection (from env var passed in CLI)
const mongoUrl = process.env.MONGODB_URI
console.log('Connecting to', mongoUrl)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// route for fetching all resources
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

// route for fetching phonebook info and current date
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${Person.length} people</p>
    <p>${date}</p>
  `)
})

// route for fetching a single person by id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person)
  })
})

// route for deleting a person by id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(note => {
      response.status(404).end()
    })
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

// route for adding a new person
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // check if name or number is missing
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
    
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  if (persons.find(p => p.name === person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

// handler of requests made to unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})