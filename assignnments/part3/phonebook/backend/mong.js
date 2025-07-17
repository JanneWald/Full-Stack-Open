const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Need a password in arguments')
  process.exit(1)
}

// Mongo DB setup

const password = process.argv[2]

const url  = `mongodb+srv://fullstack:${password}@fullstackopen.ghvaraw.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

// Helper Methods

const addPerson = (name, number) => {
  console.log(`Adding ${name}@${number} to the database`)
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(result)
    mongoose.connection.close()
    console.log(`${name} has been succesfully added`)
  }).catch(
    error => console.log('Error adding to database', error)
  )
}

const listPeople = () => {
  console.log('[MongoDB] Listing all people')
  Person.find({}).then(
    result => {
      result.forEach(note => console.log(note))
      mongoose.connection.close()
    }
  ).catch(
    error => console.log('[MongoDB] Error viewing databse', error)
  )
}

// Main
if (process.argv.length === 3){
  listPeople()
}
else if (process.argv.length >= 5){
  addPerson(process.argv[3], process.argv[4])
}
else{
  console.log('Wrong parameters. Requires at least a password. To add person instead of view, require name and number parameters')
}