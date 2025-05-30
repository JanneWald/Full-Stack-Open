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
```js
<ul>
  {notes.map(note => <li>{note.content}</li>)}
</ul>
```
or for "readability"
```js
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
```js
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
```js
const addNote = (event) => {    
	event.preventDefault()    
	console.log('button clicked', event.target)  
}
```
- Make a form with  event handler
```js
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
```js
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
```js
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