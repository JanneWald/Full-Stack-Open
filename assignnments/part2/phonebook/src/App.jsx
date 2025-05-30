import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const updatePerson = (event) => {
    event.preventDefault()
    console.log(event.type)
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      // use ` backticks for string templates
      alert(`Not so fast, ${newName} is already in the phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName}))
    }
    setNewName('')
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
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
    
  )
}

export default App