## NodeJS and Express
- NodeJS runs on Google Chrome V8 JS engine

Check node version:
```bash
node -v
```
Template:
```bash
npm init
```
Add line to scripts inside `package.json`:
```json
    "start": "node index.js",
```
Run `index.js` via node:
```bash
node index.js
```
or via npm
```bash
npm start
```
#### Web Server
Hello World, Web Server
```js
const http = require('http') // Node web server module module

const app = http.createServer( // Create server method with an event handler
    (request, response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' }) // Ok and header for response
        response.end('Hello World') // Additional content
    }
)

const PORT = 3001 // Empty port
app.listen(PORT) // Start server
console.log(`Server running on port ${PORT}`)
```
JSon Server
```js
const http = require('http')

let notes = [  
        {    
        id: "1",    
        content: "HTML is easy",    
        important: true  
        },  
        {    
        id: "2",    
        content: "Browser can execute only JavaScript",    
        important: false  
        },  
    ]
const app = http.createServer(
    (request, response) => {  
        response.writeHead(200, { 'Content-Type': 'application/json' }) // Content format json
        response.end(JSON.stringify(notes)) // Response.end needs a string
        }
    )

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```
#### Express
- Makes server side dev more tolerable
Install with 
```bash
npm install express
```
New server:
```js
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => { /// HTTP GET at root
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => { // HTTP GET at ./api/notes
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
- Server does not restart on changes unless watched:
```json
    "dev": "node --watch index.js"
```
Add to scripts in `package.json`, run with `npm run dev`
#### Rest
- For full REST, resources should be specifies by the url from a root, like `api/`
  - `www.example.com/api/notes`
    - `GET notes/10`, return 10th resource from notes
    - `GET notes`, return all notes resources
    - `POST notes`, create new resource with data
    - `DELETE notes/10`, remove resource from notes
    - `PUT notes/10`, replaces resouce in notes
    - `PATCH notes/10`, replaces part of resouces in notes  
##### Fetching resource

```js
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id // Gets id var from url
    const note = notes.find(note => note.id === id)
    if (note) {    
        response.json(note)  
    }
    else { // Need to handle not found or will default with 200 OK response 
        response.status(404).end()  
}})
```

##### Deleting Resource
```js
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```
#### Postman
- Use postman to test out things other than HTTP GET
- Can use, desltop, browser, or vscode extension
    - Alternatively use REST extentions
#### Recieving data
**to recieve json data you need to specify or unreadable header:**
```js
app.use(express.json())
```
Example notes post
```js
// Get next note id
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1) 
}

// Method for recieving a post
app.post('/api/notes', (request, response) => {
  const body = request.body

  // POST must have content
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false, // False if not important
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note) // Send back note
})
```
#### MiddleWare
- express json parser is done with a middleware
- can use multiple middlewares at the same time
- write middleware with 3 params
```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
```
Morgan is good middleware for displaying requests to server in console

## Deploying to Internet
- If random user connected to a server @ip1 but makes queries to @ip2 for a backend `Same Origin Policy` will be an issue. This is to stop session hijacking and sending data maliciously
Use `cors` to fix 
```js
const cors = require('cors')

app.use(cors())

// or

app.use(cors({
  origin: 'http://localhost:5173' // Specify an addr for db for more security
}))
```
#### Deploying to Render
- Create new web service
- Give repo of your proj
- Give app root, ex: `assignnments/part3/phonebook/backend`
- Give install command
```bash
npm install
```
- Give run command
```bash
npm run dev
```
- Should automatically redeploy on new commits
- Can also give env variables

#### Frontend Production Build
- Normally react in dev mode with clear error
- Prod build needed for optimized code
```bash
npm run build
```
  - Creates a `dist/` folder with static minified js code
#### Serving static files from backend
- Can copy `dist/` folder into backend
- Have express show *static* content uses `static` middleware
  - `app.use(express.static('dist'))`
  - Upon an HTTP GET, static will look for matching page in `dist/`

## MongoDB
- Mongo is a *document* database
- Create valid user/pass to access
- In cluster allow all ip intenet access
- Can use generated URI with Node.js's `mongodb` package
  - Should use `mongoose` to auto convert js object to mongo document

Example usage
```js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```
#### Sending Data
Making a mongo *schema*
- preset mongo structure, defining fields and data types
```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```
- Document database does not even need identical data per collection
- `Note` is a mongo constructor for document

Use constructor and send:
```js
const note = new Note({
  content: 'HTML is Easy',
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```
#### Recieving Data
Use mongo find command
```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```
- `{}` Signifies all notes
- Can specify with other object flags.
Query for notes that have important flag:
```js
Note.find({ important: true }).then(result => {
  // ...
})
```
#### Defining env variables using `.env`
Install with npm:
```bash
npm install dotenv
```
- Create a `.env` file in project root
  - Add to git ignore
Example file:
```js
MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```
Load variables with `require`:
```js
require('dotenv').config()
// ...
const PORT = process.env.PORT
```
#### Error handling w/ Middleware
- Add `next` to an express method:
```js
app.get('/api/notes/:id', (request, response, next) => {
// .. Some promise ..
  .catch(error => next(error))
```
- This will call an `error handler middleware`
  - Defined with 4 params
```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```
#### Other important mongoose methods
- `findById()`
- `findByIdAndDelete()`

## Validation
- Can provide additional rules to mongo for accepting documents

Add validation rules to schema:
```js
const noteSchema = new mongoose.Schema({
  content: {    
    type: String,    
    minLength: 5,   // Built in validator from Mongoose
    required: true  // Built in validator from Mongoose
    },  
  important: Boolean
})
```
- Can make custom validators
  - https://mongoosejs.com/docs/validation.html#custom-validators
- Breaking rule causes an `ValidationError` exception

Error handler example:
```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {    // Case for Validations 
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
```
- Any return code outside `2xx` will activate the catch block
  - Ex: 400, 404, etc.
  - Thus we can use .catch() with an axios promise in frontend

## Linting
Add eslint as dev dependency
```bash
npm install eslint @eslint/js --save-dev
```
- dev dependencies are only included in non production builds
Initialize eslint:
```bash
npx eslint --init
```
- This generates config file: `eslint.config.mjs`

Use default JS lint setting:
```js
import globals from 'globals'
import js from '@eslint/js'// ...

export default [
  js.configs.recommended,  {
    // ...
  },
]
```
Example plugin install with code rules:
```bash
npm install --save-dev @stylistic/eslint-plugin-js
```
Add to file
```js
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
export default [
  {
    // ...
    plugins: { '@stylistic/js': stylisticJs, },
    rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],   
    },   
  },
]
```
- Lint running should be a seperate script
```json
"lint": "eslint .",
```
- Make linter ignore dist built files:
```js
// ...
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    // ...
  },

  { 
    ignores: ['dist/**'], 
  },
]
```
- ABSOLUTELY add the VSCode extension for eslint from Microsoft