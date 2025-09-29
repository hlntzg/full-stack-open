const express = require('express');
const morgan = require('morgan');
const app = express();

// middleware for parsing JSON bodies
app.use(express.json())
// middleware for logging requests
app.use(morgan('tiny'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423124"
    }
]

// route for fetching all resources
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// route for fetching phonebook info and current date
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

// route for fetching a single person by id
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// route for deleting a person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// route for adding a new person
app.post('/api/persons', (request, response) => {
  const person = request.body
  
  // check if name or number is missing
  if (!person.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
    
  if (!person.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  if (persons.find(p => p.name === person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  // generate a new id
  const personId = Math.random() * 10000

  const newPerson = { 
    id: String(personId), 
    name: person.name, 
    number: person.number 
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

// bind the application to port 3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})