import { useState } from 'react'
import Note from './components/Note'

// problem: const App = ({ notes }) => { ... } -> creates a self-reference error
const App = (props) => {

  // console.log(props.notes)

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    setNotes(notes.concat(noteObject))

    // resets the value of the controlled input element 
    // by calling the setNewNote function of the newNote state
    setNewNote('a new note...')
  }
  
  // event handler that synchronizes the changes made to the input
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note 
            key={note.id}
            note={note} 
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
