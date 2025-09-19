import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('input your name here')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('input your name here')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <ul>
        {persons.map(person =>          
          <li key={person.name}>
            {person.name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App