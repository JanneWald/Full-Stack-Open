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