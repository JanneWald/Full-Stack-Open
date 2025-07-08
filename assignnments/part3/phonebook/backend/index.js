const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
require('dotenv').config()


app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) { // for example only, display json passing
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
app.use(express.static('dist')) // Static dist/ folder middleware

// Date
const date = new Date().toUTCString()

const getPeople = () => {
  console.log("[Express] Requesting all people in database")
  return Person.find({}).then(
    result => {
      console.log(`[Express] Server returned ${result}`)
      return result
    })
    .catch(error => console.log(`Error viewing databse, ${error.message}`))
}

const addPerson = (name, number) => {
  console.log(`Adding ${name}@${number} to the database`)
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`Result: ${result}`)
    console.log(`${name} has been succesfully added`)
  })
  .catch(error => console.log('Error adding to databse'))
}

// Test root
app.get('/', (request, response) => {
    response.send('<h1>test api root dir</h1>')
})

// Info Tab
app.get('/info', (request, response) => {
    response.send(`The phonebook is storing data for ${getPeople().length} people\nAs of ${date}.`)
})

// General GET
app.get('/api/persons', (request, response) => {
  console.log("[Express] Requested list of all people, returned:")  
  console.log(getPeople())
  getPeople()
    .then(
      people => {
        console.log('[Express] Inside generic api call')
        response.json(people)
      }
    )
    .catch(
      error => {
        console.log(`[Express] Got error instead of people: {error.message}`)
        response.status(500).json({error:'idk failed to get people'})
      }
    )
})

// Specific GET
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = getPeople().find(p => p.id === id)
    if (person) {
        response.json(person)
    }
    else {
        console.log(`${id} was requested but not present`)
        return response.status(400).json({ 
            error: 'requested person was not present in api' 
        })    
    }
})

// Specific delete
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const persons = getPeople()
    const person = persons.find(p => p.id === id)
    if (person) {
        persons = persons.filter(p => p.id !== person.id)
        response.json(person)
    }
    else {
        console.log(`${id} not present for deletion`)
        return response.status(400).json({ 
            error: 'person to be deleted was not present in api' 
        })
    }
})

// Method for recieving a post
app.post('/api/persons', (request, response) => {
    const body = request.body

  // POST must have X fields
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'fields (name and or number) missing' 
    })
  }

  const person = {
    id: genId(),
    name: body.name,
    number: body.number,
  }

  if (getPeople().find(p => p.name === person.name)){
    return response.status(400).json({ 
        error: 'name must be unique' 
    })
  }

  addPerson(body.name, body.number)
  response.json(person) // Send back note
})

// Main
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})