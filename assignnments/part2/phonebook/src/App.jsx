import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  const updateFilter = (event) => {
    event.preventDefault()
    console.log("Updated filter", event.target.value)
    setPersonFilter(event.target.value)
  }

  const updatePerson = (event) => {
    event.preventDefault()
    console.log("Updated name", event.target.value)
    setNewName(event.target.value)
  }

  const updateNumber = (event) =>{
    event.preventDefault()
    console.log("Updated number", event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      // use ` backticks for string templates
      alert(`Not so fast, ${newName} is already in the phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number:newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const getPersons = () => {
    if(personFilter === '')
      return persons
    else
      return persons.filter(
        person => person.name.toLowerCase().includes(personFilter.toLowerCase()) 
      )
  }

  console.log("Persons", persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter names for:
          <input 
            value={personFilter}
            onChange={updateFilter}
          />
        </div>
      </form>
      <form>
        <div>
          name: 
          <input 
          value={newName}
          onChange={updatePerson}
          />
          number:
          <input 
          value={newNumber}
          onChange={updateNumber}
          />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {getPersons().map(person => 
        <li key={person.id}>{person.name} - {person.number}</li>)}
      </ul>
    </div>
    
  )
}

export default App