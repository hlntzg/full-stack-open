const PersonForm = ({ 
    addPerson, 
    newName, 
    handleNameChange, 
    newNumber, 
    handleNumberChange 
}) => {
  return (
      <form>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <div>
            number: 
            <input
              value={newNumber}
              onChange={handleNumberChange}
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
    )
}

export default PersonForm