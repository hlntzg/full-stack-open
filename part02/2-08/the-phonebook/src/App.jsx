import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '012-345-678'}]) 
  const [newName, setNewName] = useState('name')
  const [newNumber, setNewNumber] = useState('phone number')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const invalidName = persons.find(person => person.name === newName)
    if (invalidName){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('name')
    setNewNumber('phone number')
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
          <div>
            number: 
            <input
              value={newNumber}
              onChange={handleNewNumber}
            />
          </div>
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

      {persons.map(person =>          
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

export default App