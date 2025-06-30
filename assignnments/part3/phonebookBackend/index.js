const express = require('express')
const app = express()
app.use(express.json())

const date = new Date().toUTCString()

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

const getId = () => {
  if (persons.length > 0) {
    const maxId = Math.max(...persons.map(p => Number(p.id)))
    return maxId + 1
  } else {
    return 0
  }
}

app.get('/', (request, response) => {
    console.log(`${request.header} Requested root`)
    response.send('<h1>test api root dir</h1>')
})

app.get('/info', (request, response) => {
    console.log(`${request.header} Requested info page`)
    response.send(`The phonebook is storing data for ${persons.length} people\nAs of ${date}.`)
})

app.get('/api/persons', (request, response) => {
    console.log(`${request.header} Requested person log`)
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        console.log(`${request.header} Requested person[${id}]`)
        response.json(person)
    }
    else {
        console.log(`${id} was requested but not present`)
        response.status(404).end()
    }
})

// Method for recieving a post
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(`POST request with: ${body}`)

  // POST must have X fields
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'fields missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getId(),
  }

  persons = persons.concat(person)

  response.json(person) // Send back note
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})