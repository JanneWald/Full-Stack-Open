const mongoose = require('mongoose')
require('dotenv').config()

// Mongo DB setup
const url  = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log(`Connecting to: ${url}`)
mongoose.connect(url)
    .then(
        result => console.log('Succesfully Connected')
    )
    .catch(
        error => console.log(`Error connecting: ${error.message}`)
    )

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Add id field
    delete returnedObject._id // Remove _id field
    delete returnedObject.__v // Remove __v field
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person