// controllers/notes.js
// event handlers of routes are commonly referred to as controllers

const notesRouter = require('express').Router()
const Note = require('../models/note')

// notesRouter.get('/', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

notesRouter.get('/', async (request, response) => { 
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// When using async/await syntax, Express will automatically
// call the error-handling middleware if an await statement 
// throws an error or the awaited promise is rejected
notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  // note.save()
  //   .then(savedNote => {
  //     // response.json(savedNote)
  //     response.status(201).json(savedNote)
  //   })
  //   .catch(error => next(error))
  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

module.exports = notesRouter