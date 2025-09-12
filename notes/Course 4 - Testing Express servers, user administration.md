Here is an example of good project structure 
```txt
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```
#### Exporting Functions
- Imagine two methods
```js
const info(...params) => {//..../}
// error ...

module.exports = { info, error }
```
- Can be called via dot notation or broken down with `require()`
```js
const logger = require('./utils/logger')
logger.info('example')

// or

const { info, error } = require('./utils/logger')
info('example')
```
## Testing in Node
- There are lots of testing libraries
- Add to npm script to test:
```json
    "test": "node --test",
```
- Use built in Node `node:test` libary
```js
const { test } = require('node:test') // Test funciton
const assert = require('node:assert') // Assertion function

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})
```
- `node --test` automatically runs tests in files ending in `.test.js`

```js
describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })
```
- Adds a descriptor to the testing output
## Testing Backend
- Helps to have a testing mode env variable 
```js
{
  // ...
  "scripts": {

    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node --watch index.js",
    "test": "cross-env  NODE_ENV=test node --test",
    "lint": "eslint ."
  },
  // ...
}
```
```js
const MONGODB_URI = process.env.NODE_ENV === 'test'   
? process.env.TEST_MONGODB_URI  
: process.env.MONGODB_URI
```
#### Supertest
```bash
npm install --save-dev supertest
```
Use supertest like so
```js
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
```
- Wraps the app around supertest function
- Can call http methods
- Can expect content types or permission codes
- Closes connection after test
#### Initializing test DB
- Use beforeEach to clear an initalize database

```js
beforeEach(async () => {  
  await Note.deleteMany({})  
  let noteObject = new Note(initialNotes[0])  
  await noteObject.save()  
  noteObject = new Note(initialNotes[1])  
  await noteObject.save()
})
```

#### Running tests one by one
- Sometimes you only want one/two available test
- Use `test.only(() => {...})` to specify
- Run `npm test -- --test-only

#### async/await
- Promise chaining is good but looks ugly
```js
Note.find({})
  .then(notes => {
    return notes[0].deleteOne()
  })
  .then(response => {
    console.log('the first note is removed')
    // more code here
  })
// ⌄⌄⌄⌄⌄⌄⌄ GETS CONVERTED TO ⌄⌄⌄⌄⌄⌄⌄⌄
const notes = await Note.find({})
const response = await notes[0].deleteOne()

console.log('the first note is removed')
```
- `await` must be used in an async function
Example converting an express router:
```js
notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})
// To
notesRouter.get('/', async (request, response) => { 
  const notes = await Note.find({})
  response.json(notes)
})
```
- In new express, error handling middleware gets automatically called in await, no need to catch failure
#### Optimizing before each
- Basic await causes problems in `forEach(...)`
```js
helper.initialNotes.forEach(async (note) => {
  let noteObject = new Note(note)
  await noteObject.save()
  console.log('saved')
})
```
- Use `Promise.all()`
```js
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
```
## User Authentication
User collection
```json
{
  username: 'mluukkai',
  _id: 123456,
}
```
Note collection
```json
{
  content: 'HTML is easy',
  important: false,
  _id: 221212,
  user: 123456,
}
```
#### User schema for mongoose
```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId, // References another document
      ref: 'Note' // The schema type of said reference
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
```
Add user to note schema
```js
user: {    
  type: mongoose.Schema.Types.ObjectId,    
  ref: 'User'  
}
```
#### Creating a user
- User has a name, id, and password
- Password should be a hash, dont store raw plaintext of passwords
`npm install bcrypt`
The users router:
```js
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
```
#### Uniqueness in db
```js
// Inside schema value
username: {    
  type: String,    
  required: true,    
  unique: true // this ensures the uniqueness of username  },
```
- If there are already documents breaking this rule were cooked
- Make sure db is healthy
- This creates a `MongoServerError`, catch that instead of validation
#### Router Example
```js
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
//...

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)
  if (!user) {    return response.status(400).json({ error: 'userId missing or not valid' })  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)  await user.save()
  response.status(201).json(savedNote)
})

// ...
```
#### Populating
- When calling `GET .../api/users/id` we want all the notes included with that id
- Under a relational db, use JOIN query
- Use `populate()` for mongo
```js
const users = await User    
  .find({}).populate('notes')
```
- Use mongo syntax to choose to include only fields we are interested int
```js
const users = await User
  .find({}).populate('notes', { content: 1, important: 1 }) // Only gets content, important, (always id too)
```
## Token authentication
- Basics of token authentication
  - Users log in on a login form, usually in react
  - Make POST to `api/login` with `{username:...,password:...}` 
  - If correct authentication, server generates token
    - Signed digitally, makes it impossible to falsify
  - Server sends back token and appripriate status code
  - Browser saves token
  - Everytime user does some http operation token is sent
  - Server identifies requests as logged in
- Token creator can be made with `npm install jsonwebtoken`
```js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
```
#### Problems?
- Blind faith in token, maybe need to revoke token access
```js
const token = jwt.sign(    
  userForToken,     
  process.env.SECRET,    
  { expiresIn: 60*60 } // Token expires in 1 hour
)
```
- Dont forget following errors raised: `JsonWebTokenError`, `TokenExpiredError`