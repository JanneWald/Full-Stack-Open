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