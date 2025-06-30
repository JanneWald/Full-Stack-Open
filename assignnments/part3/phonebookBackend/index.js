const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

// Date
const date = new Date().toUTCString()

// Beautiful database
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Getting next id num helper
const getId = () => {
  if (persons.length > 0) {
    return Math.floor(Math.random() * 1000000) + 1
  } else {
    return 0
  }
}

// Test root
app.get('/', (request, response) => {
    console.log(`${request.header} Requested root`)
    response.send('<h1>test api root dir</h1>')
})

// Info Tab
app.get('/info', (request, response) => {
    console.log(`${request.header} Requested info page`)
    response.send(`The phonebook is storing data for ${persons.length} people\nAs of ${date}.`)
})

// General GET
app.get('/api/persons', (request, response) => {
    console.log(`${request.header} Requested person log`)
    response.json(persons)
})

// Specific GET
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        console.log(`${request.header} Requested person[${id}]`)
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
    const person = persons.find(p => p.id === id)
    if (person) {
        console.log(`${request.header} Deleting person[${id}]`)
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
    console.log(`POST request with: ${body}`)

  // POST must have X fields
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'fields (name and or number) missing' 
    })
  }

  const person = {
    id: getId(),
    name: body.name,
    number: body.number,
  }

  if (persons.find(p => p.name === person.name)){
    return response.status(400).json({ 
        error: 'name must be unique' 
    })
  }

  persons = persons.concat(person)

  response.json(person) // Send back note
})

// Main
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})