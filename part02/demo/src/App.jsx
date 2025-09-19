const App = (props) => {
  const { notes } = props

  const result = notes.map(notes => notes.content)
  console.log(result)

  // map method is used to create view elements, 
  // the value of the variable must be rendered inside curly braces
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
