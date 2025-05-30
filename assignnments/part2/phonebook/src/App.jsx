import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
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
      <Filter value={personFilter} onChange={updateFilter}/>
      <PersonForm newName={newName} updatePerson={updatePerson} newNumber={newNumber} updateNumber={updateNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={getPersons()}/>
    </div> 
  )
}

export default App