const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()
app.use(cors())
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

// Return all people from mongo db
const getPeople = () => {
  console.log('[Express] Requesting all people in database')
  return Person.find({}).then(
    result => {
      console.log(`[Express] Server returned ${result}`)
      return result
    })
    .catch(
      error => console.log(`Error viewing databse, ${error.message}`)
    )
}

// Info Tab
app.get('/info', (request, response, next) => {
  console.log('[Express] Hit /info')
  const date = new Date().toUTCString()
  Person.find({}).then(
    people => {
      return response.send(`The phonebook is storing data for ${people.length} people\nAs of ${date}.`)
    }
  )
    .catch(
      error => {
        next(error)
      }
    )
})

// General GET
app.get('/api/persons', (request, response, next) => {
  console.log('[Express] Hit /api/persons')
  console.log('[Express] Requested list of all people, returned:')
  console.log(getPeople())
  Person.find({})
    .then(
      people => {
        console.log('[Express] Inside generic api call')
        response.json(people)
      }
    )
    .catch(
      error => {
        console.log(`[Express] Got error instead of people: ${error.message}`)
        next(error)
      }
    )
})

// Specific GET
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  return Person.findById(id)
    .then(
      person => {
        if (person)
          return response.json(person)
        else{
          console.log(`${id} was requested but not present`)
          return response.status(400).json({
            error: 'requested person was not present in api'
          })
        }
      }
    )
    .catch(
      error => {next(error)}
    )
})

// Specific delete
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(
      person => {
        if (person) {
          console.log(`[Express] Mongo accepted deletion with: ${person}`)
          return response.json(person)
        }
        else {
          console.log(`${id} not present for deletion`)
          return response.status(400).json({
            error: 'person to be deleted was not present in api'
          })
        }
      }
    )
    .catch(
      error => next(error)
    )
})

// Method for recieving a post
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // POST must have all fields
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'fields (name and or number) missing'
    })
  }

  return Person.find({})
    .then(people => {
      // Don't add duplicate to db
      if (people.find(p => p.name === body.name)){
        return response.status(400).json({ error: 'name must be unique' })
      }
      // Forward mongo response back
      else {
        console.log(`Adding ${body.name}@${body.number} to the database`)
        const person = new Person({ name: body.name, number: body.number })

        person.save()
          .then(result => {
            console.log(`Result: ${result}`)
            console.log(`${body.name} has been succesfully added`)
            return response.json(body)
          })
          .catch(
            error => {
              console.log('[Express] Error adding to databse:')
              next(error)
            })
      }
    })
    .catch(
      error => next(error)
    )
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save()
        .then(
          updatedPerson => {
            response.json(updatedPerson)
          }
        )
    })
    .catch(
      error => next(error)
    )
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    console.log('[Express] Cast Error')
    return response.status(400).json({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    console.log('[Express] Cast Error')
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist')) // Static dist/ folder middleware

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

// Main
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})