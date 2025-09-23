import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect (() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  // const result = condition ? val1 : val2
  const notesToShow = showAll ? 
    notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    // POST request
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('a new note...')
    })
  }
  
  // event handler that synchronizes the changes made to the input
  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
  const note = notes.find(n => n.id === id)
  // create a copy object using object spread syntax
  // why make a copy? -> because we don't want to modify the existing object directly
  // the variable note is a reference to an item in the notes array in the component's state
  const changedNote = { ...note, important: !note.important }

  axios
    .put(`http://localhost:3001/notes/${id}`, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id === id ? response.data : note))
  })
}

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button 
          onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form 
        onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">
            save
        </button>
      </form> 
    </div>
  )
}

export default App
