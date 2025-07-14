import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Message from './components/Message.jsx'
import phoneService from './services/phonebook.js'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('green')

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
    const previousEntry = persons.find(person => person.name === newName)
    if (previousEntry){
      // use ` backticks for string templates
      if(confirm(`${previousEntry.name} is already in phonebook, would you like to update it?`)){
        phoneService
          .update(previousEntry, newNumber)
          .then(
            response => {
              console.log('updating names')
              console.log(persons)
              setPersons(persons.map(person => {
                if(person.id === previousEntry.id){
                  return response
                }
                else{
                  return person
                }
              }))
              console.log('updated names')
              console.log(persons)
            }
          )
          .then(setMessage(`Updated ${previousEntry.name}'s number`))
          .then(setColor('purple'))
          .then(setTimeout(() => setMessage(""), 5000))
          .catch(error => {
            setColor('red')
            setMessage(`${previousEntry.name} was recently removed from db`)
            setPersons(persons.filter(person => person.id != previousEntry.id))
            setTimeout(() => setMessage(""), 5000)
          })
      }
    }

    else{
      // Setting var name to desired field lets you shortcut name: newName
      const name = newName
      const number = newNumber
      phoneService
        .add(name, number)
        .then(response => setPersons(persons.concat(response)))
        .then(setMessage(`Added ${newName} to phonebook`))
        .then(setColor('green'))
        .then(setTimeout(() => setMessage(""), 5000))
        .catch(error => {
          const error_response = error.response.data.error
          console.log(`[Vite] Error: ${error_response}`)
          setColor('red')
          setMessage(error_response)
          setTimeout(() => setMessage(""), 5000)
        })
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
      .catch(error => console.log('error getting from db'))

  }, [])

  console.log("Persons: ", persons)
  return (
    <div>
      <Message message={message} color={color}/>
      <h2>Phonebook</h2>
      <Filter value={personFilter} onChange={updateFilter}/>
      <PersonForm newName={newName} updatePerson={updatePerson} newNumber={newNumber} updateNumber={updateNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={getPersons()} removePerson={removePerson}/>
    </div> 
  )
}

export default App