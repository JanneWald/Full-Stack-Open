## Tips
- If you want to concatenate string, do so with commas:
```js
console.log('props value is', props)
```
- Use VSCode snippets
	- https://code.visualstudio.com/docs/editing/userdefinedsnippets#_creating-your-own-snippets
## Rendering a collection
- Important to know array operators of JS
	- Find - returns first element that passes test
	- Filter - makes new array w/ only elements that pass the test
	- Map - makes a new array with a given `foreach` method
- Can use map for easy lists
```jsx
<ul>
  {notes.map(note => <li>{note.content}</li>)}
</ul>
```
or for "readability"
```jsx
<ul>
{notes.map(note => 
	<li>            
		{note.content}
	</li>
)}
</ul>
```
- Will cause warning because of missing `Key-attribute`
- Fix w/:
```jsx
<li key={note.id}>
	{note.content}
</li>
```
- React uses key to help with virtual DOM rendering
- You can get array index with second param of map:
	- `notes.map((note, i) => ...)`
	- NOT RECOMMENDED:
		- https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
- Make components in a `components/` folder
- use `import Component from "./components/component.jsx"`
## Forms
```js
const [notes, setNotes] = useState(props.notes) // Intitial previous array 
const [notes, setNotes] = useState([]) // Initial empty array
```
- Make an event handler
	- `event.preventDefault` prevents action from submitting a form
```jsx
const addNote = (event) => {    
	event.preventDefault()    
	console.log('button clicked', event.target)  
}
```
- Make a form with  event handler
```jsx
<form onSubmit={addNote}>        
	<input />        
	<button type="submit">save</button>   
</form>   
```
- How to access data inside input?
	- **Controlled component**
```js
const [newNote, setNewNote] = useState('a new note...')
...
<form onSubmit={addNote}>
	<input value={newNote} />        
	<button type="submit">save</button>
</form> 
```
- The `App` component controls behavior of input element
- Now needs an event handler to sync changes to state
```jsx
const handleNoteChange = (event) => {
	console.log(event.target.value)    
	setNewNote(event.target.value)  }
...
<form onSubmit={addNote}>
	<input
		value={newNote}
		onChange={handleNoteChange} // Add handler inside input field        
	/>
	<button type="submit">save</button>
</form> 
```
Filtering elements
```jsx
const [showAll, setShowAll] = useState(true)
...
const notesToShow = showAll    
	? notes // If true, return normal list; False, return important filter
	: notes.filter(note => note.important === true)
...
<ul>
{notesToShow.map(note =>          
	<Note key={note.id} note={note} />
)} </ul>
```
## Getting data from server
- Use *JSON Server* tool
	- Create file: `db.json` in root directory fill with jsons... notes:
	- Start server with `npx json--server -port 3001 db.json`
	- You can view data at `http://localhost:3001/notes`
#### Browser as runtime env
- Browsers are all single threader
	- do not have an infinite loop or you will cash
- `npm` or Node Package Manager has *axios fetch*
- install in root of directory with `npm install axios`
	- should see in dependencies in `package.json`

```bash
npm install axios
npm install json-server --save-dev
```

Add to `scripts` part in package.json
```json
    "server": "json-server -p 3001 db.json"
```
Now can easily run 
```bash
npm run server
```
#### Axios
- with json server and site running, get data like:
```jsx
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```
- These return *promises*
	- objects representing the eventual completeion or failure of an async operation
	- Can either be:
		- Pending - in transite operation, final val not available yet
		- fulfilled - sucessful operation, final val is available
		- Rejected - failed operation, final val is not determined
- To use result muse have event handler with `then`:
```jsx
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```
or combine into:
```jsx
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})
```
#### Effect-hooks
- *Effects let a component connect and synch with external systems. Including network, DOM, animation, widgets, and other non React Code*
```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes') // prints 0 first, since it has not recieved the data yer

  // ...
}
```
- This example gets data from the server, which happens async
- Effects have 2 params, the function to be called, and how often effect is run
	- `[]` means run only once on first render
	- Otherwise it would go on forever

## Manipulating Data from Server
#### Rest
- In REST, indivdual objects are *resources*
- You can access these resources by using the url and its id like: `localhost:3001/notes/3` to get the notes with id of 3
	- Recieving uses `HTTP GET`
	- Sending uses `HTTP POST`
#### Sending data to server
```jsx
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }
  axios    
  	.post('http://localhost:3001/notes', noteObject)
	.then(response => {
		console.log(response)
	})}
```
- Can change parts of json with `PATCH` instead of `POST`
```jsx
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)

  // Make copy, changing only important field with "object spreading"
  const changedNote = { ...note, important: !note.important }

  // Update notes with new notes
  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id === id ? response.data : note))
  })
}
```

#### Extracting Communication
- Simplify the posts/gets for notes in a service file called: /src/services/notes.js
```jsx
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}


// K/V pair, if same name could use: export default { getAll, create, update }
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
```
- Updated version to only return a promise
```jsx
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {    return response.data  })}
```
#### Promises and Errors
- What if user changes db value that has been removed?
  - Need to handle error
- Use command `then()`
  - have lambda execute after succesful completion of promise, returns a new promise
  - Multiple promises are a *promise chain*  

Use `catch()` after a promse
```jsx 
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
	alert(`the note '${note.content}' was already deleted from server`
	setNotes(notes.filter(n => n.id !== id))   // Return any notes that wernt a problem child   })
```

#### STYLING :3
- Add file `src/index.css`
- Add style and import in `main.jsx`
```jsx
import './index.css'
```
Inline styling for components:
```jsx
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  )
}

export default Footer
```