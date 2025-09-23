import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookPerson from './services/phonebookPerson'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // GET request
    phonebookPerson
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    // console.log(event.target.value)
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
      id: String(persons.length + 1),
    }

    // POST request
    phonebookPerson
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  return (
    <div>
      <h1>Phonebook</h1>
        <SearchFilter
          filter={filter}
          handleFilter={handleFilter}
        />  
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNewName}
        newNumber={newNumber}
        handleNumberChange={handleNewNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Persons
          key={person.id}
          person={person}
        />
      )}
    </div>
  )
}

export default App