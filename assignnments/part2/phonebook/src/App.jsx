import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneService from './services/phonebook.js'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  // Event handler to update filter field
  const updateFilter = (event) => {
    event.preventDefault()
    console.log("Updated filter", event.target.value)
    setPersonFilter(event.target.value)
  }

  // Event handler to update person field
  const updatePerson = (event) => {
    event.preventDefault()
    console.log("Updated name", event.target.value)
    setNewName(event.target.value)
  }

  // Event handler to update number field 
  const updateNumber = (event) => {
    event.preventDefault()
    console.log("Updated number", event.target.value)
    setNewNumber(event.target.value)
  }

  // Event handler to remove person's id
  const removePerson = (id) => {
    const name = persons.find(person => person.id == id).name
    if(!confirm(`Are you sure you want to remove ${name}`)){
      console.log('Ignoring deletion')
      return
    }

    console.log(`Sending ${id} to service for deletion`)
    phoneService.remove(id)
    setPersons(persons.filter(person => person.id !== id))
    console.log('Removed person, update list:')
    console.log(persons)
  }
  
  // Adds person to json assuming its new in phonebook
  const addPerson = (event) =>{
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      // use ` backticks for string templates
      alert(`Not so fast, ${newName} is already in the phonebook`)
    }

    else{
      // Setting var name to desired field lets you shortcut name: newName
      const name = newName
      const number = newNumber
      phoneService
        .add(name, number)
        .then(response => setPersons(persons.concat(response)))
    }
    
    setNewName('')
    setNewNumber('')
  }

  // Returns persons with given filter
  const getPersons = () => {
    if(personFilter === '')
      return persons
    else
      return persons.filter(
        person => person.name.toLowerCase().includes(personFilter.toLowerCase()) 
      )
  }

  // Effect to get json of persons from server, only once
  useEffect(() => {
    console.log("Json server effect")
    phoneService
      .getAll()
      .then(response => {setPersons(response)})
  }, [])

  console.log("Persons: ", persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={personFilter} onChange={updateFilter}/>
      <PersonForm newName={newName} updatePerson={updatePerson} newNumber={newNumber} updateNumber={updateNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={getPersons()} removePerson={removePerson}/>
    </div> 
  )
}

export default App