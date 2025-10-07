const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const username = process.argv[2]
const password = process.argv[3]

const url = `mongodb+srv://${username}:${password}@cluster0.2xgojtk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// Everything in Mongoose starts with a Schema. Each schema maps to a
// MongoDB collection and defines the shape of the documents within that collection.
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// The .model() function makes a copy of schema
// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
const Note = mongoose.model('Note', noteSchema)

// Creating and saving objects
// const note = new Note({
//   content: 'one more HTML is easy',
//   important: true,
// })

// note
//   .save()
//   .then(result => {
//     console.log('note saved!')
//     console.log(result)
//     mongoose.connection.close()
// })

// Retrieving/fetching objects from the database
// Note.find({ important: true }).then(result => {
// ...
// })
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})