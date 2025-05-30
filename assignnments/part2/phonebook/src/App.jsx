import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '801-556-9203'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  console.log("Persons", persons)
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <li key={person.id}>{person.name} - {person.number}</li>)}
      </ul>
    </div>
    
  )
}

export default App