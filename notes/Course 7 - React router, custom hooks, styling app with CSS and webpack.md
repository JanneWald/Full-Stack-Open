## React Router
- Links can bring us to different pages
- Using JS we usually trick people into thinking we go somwhere
  - Technically always the same page
- We should have different pages for bookmarking and stuff
- `React Router Library` is here!
`npm install react-router-dom`
```jsx
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link> 
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}
```
- Gives us routes, and destinations(components)
#### Parameterized route
- We can add a dynamic router:
`<Link to={`/notes/${note.id}`}>{note.content}</Link>`
- Paramterized route can be setup like express:
`<Route path="/notes/:id" element={<Note notes={notes} />} />`
- Inside a note component:
```jsx
import {
  // ...
  useParams} from 'react-router-dom'

const Note = ({ notes }) => {
  const id = useParams().id // gets id from notes/:id
  const note = notes.find(n => n.id === Number(id)) 
  return (
    //..
  )
}
```
#### useNavigate
```jsx
import {
  // ...

  useNavigate
} from 'react-router-dom'

const Login = (props) => {

  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')

    navigate('/') // AUtomatically sends us home
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
      // --
      </form>
    </div>
  )
}
```
#### Redirect
`<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />`
- If user not logged in gets sent to login view
`<Navigate replace to="/login" />`

#### Parameterized route revisited
- Kind of inefficient to give the whole notes array as prop to each note
- `useMatch()` is here
```jsx
import {
  // ...

  useMatch
} from 'react-router-dom'

const App = () => {
  // ...


  const match = useMatch('/notes/:id')
  const note = match // If dynamic router called, matches the note
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        // ...
      </div>

      <Routes>

        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />   
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />      
      </Routes>   

      <div>
        <em>Note app, Department of Computer Science 2024</em>
      </div>
    </div>
  )
}  
```
## Custom Hooks
- React has 15 built in hooks
- **Don’t call Hooks inside loops, conditions, or nested functions.**
  - Only use at top level of funciton
- **You can only call Hooks while React is rendering a function component**
#### Custom Hook
- *hooks are regular JavaScript functions that can use any other hooks, as long as they adhere to the rules of hooks*
  - name of custom hooks must start with the word use
```js
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return { value, increase, decrease, zero }
}

const counter = useCounter()
cuonter.increase
```
- Common use is for reusing an onChange hook for every field in a form
```js
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return { type, value, onChange }
}
```
```js
const App = () => {
  const name = useField('text')
  // ...
  return (
    <div>
      <form>
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange} 
        /> 
        // ...
      </form>
    </div>
  )
}
```
#### Spread attributes
^^^^ about prev example
- Since name object has the same value name as `<input>` fields
- We can use spread syntax:
```js
<Greeting firstName='Arto' lastName='Hellas' />

const person = { firstName: 'Arto', lastName: 'Hellas' }

<Greeting {...person} />
``` 
## More about styles
- There are *A LOT* of ready made style libraries
- This goes over bootstrap
  - There are react versions of bootstrap
  - `reactstrap` and `react-bootstrap`
#### React bootstrap
`npm install react-bootstrap`
