import { useState, useEffect } from 'react'
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
      if (!window.confirm(`${invalidName} is alreday added to phonebook, do you want to update the number?`)){
        console.log(newName)
        setNewName('')
        setNewNumber('')
        return
      } else {
        const personObject = {...invalidName, number: newNumber}
        phonebookPerson
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personObject.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(
              `the person '${invalidName.name}' was already deleted from server`
            )
            // the deleted person gets filtered out from the state
            setPersons(persons.filter(p => p.id !== invalidName.id))
          })
        return
    }}

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    // POST request
    phonebookPerson
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
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
  
  const handleDetelePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name} ?`)){
      console.log(personToDelete)
      // DELETE request
      phonebookPerson
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(
            `the person '${personToDelete.name}' was already deleted from server`
          )
          // the deleted person gets filtered out from the state
          setPersons(persons.filter(p => p.id !== id))
        })}
  }

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
          deletedPerson={() => {handleDetelePerson(person.id)}} 
        />
      )}
    </div>
  )
}

export default App