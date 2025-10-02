const Persons = ({ person, deletedPerson }) => {
  return (
    <div>
      {person.name} {person.number} 
      <button 
        onClick={deletedPerson}>
        delete
      </button>
    </div>
  )
}

export default Persons