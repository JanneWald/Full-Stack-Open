const mongoose = require('mongoose')
require('dotenv').config()

// Mongo DB setup
const url  = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log(`Connecting to: ${url}`)
mongoose.connect(url)
    .then(
      result => console.log('[MongoDB] Succesfully Connected', result)
    )
    .catch(
      error => console.log(`[MongoDB] Error connecting, ${error.message}`)
    )

const isValidPhoneNumber = (number) => {
  console.log(`[Validator] Checking ${number}`)
  if (number.length < 8) return false

  const parts = number.split('-')
  if (parts.length !== 2) return false

  const [first, second] = parts

  // Check first part: must be 2 or 3 digits
  if (!/^\d{2,3}$/.test(first)) return false

  // Check second part: must be all digits
  if (!/^\d+$/.test(second)) return false

  return true
}

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      validate:{
        validator: isValidPhoneNumber,
        message: 'Inproper phone number, requires at least 8 numbers, with a - seperator'
      }
    }
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

