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