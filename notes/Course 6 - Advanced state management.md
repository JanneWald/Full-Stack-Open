## Flux-architecture and Redux
- Facebook made Flux
- In flux, state is seperated from components
  - Into individual *stores* 
  - Stores are changed via *actions*

#### Redux
- Redux is simpler Flux
`npm install redux`
- Whole application state in one JS obj in store
- Changed with actions
- Reducer example
```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}
```
- Store is necer called directly
```js
import { createStore } from 'redux'
const counterReducer = (state = 0, action) => { // ... 
}
const store = createStore(counterReducer)
```
- Store users reducers
```js
store.dispatch({ type: 'INCREMENT' })
```
- Use `getState` to get...state...obv
```js
const store = createStore(counterReducer)
console.log(store.getState())
store.dispatch({ type: 'INCREMENT' })
console.log(store.getState())
```
- `subscribe(() => {doSomething;})` is callback for every action
**Full example**
```js
import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => { root.render(<App />) }

renderApp()
store.subscribe(renderApp)
```
#### Redux-Notes
Adding a note example
```js
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})
```
- General convention uses `type`, and `payload`

#### Pure functions, immutable
- For a simple note store. State should be IMMUTABLE
- Cannot do state.push(action.payload) because it changes base state
```js
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload) // Makes new array
  }
  return state
}
```
- Use jest to test, `'test': 'jest'`
`npm install --save-dev jest @babel/preset-env @babel/preset-react eslint-plugin-jest`
- Create `babel.rc`
```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```
- `.eslintrc.cjs` needs `    "jest/globals": true` inside `env`

```js
import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})
```
#### Array spread
```js
const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]    
    case 'TOGGLE_IMPORTANCE':
      // ...
    default:
    return state
  }
}
```
#### Action creators
- React components don't need to know the Redux action types and forms. 
```js
const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}
```
- funciton that makes an action is called an *action creator*
```js
const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))
  }
  
  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  } // ...
}
```
- Makes things simpler
#### Forwarding Redux store to other components
- `npm install react-redux`
- Make `Main.jsx`
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>
)
```
- App is now child of provider
- Can now make a `reducer/noteReducer.js` filer
```js
const noteReducer = (state = [], action) => {
  // ...
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}
export default noteReducer
```
- Finalized app.jsx
```js
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch() // Use dispatch function in main.jxs
  const notes = useSelector(state => state) // Searches for state in store in main.jsx

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {

    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>

        {notes.map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
```

#### Other component examples
```jsx
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes
```
## Store with complex state
- Say we store notes and filter in same store
```js
{
  notes: [
    { content: 'reducer defines how redux store works', important: true, id: 1},
    { content: 'state of store can contain any data', important: false, id: 2}
  ],
  filter: 'IMPORTANT'
}
```
- Kind of tricky to manage we should combine instead
#### Combined Reducers
- Make seperate store
```js
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}
```
- In `main.jsx` combined reducers
```js
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
const reducer = combineReducers({  notes: noteReducer,  filter: filterReducer})
const store = createStore(reducer)
```
- Can use the same as before:
```js
store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
```
- EVERY REDUCER LISTENS TO THE SAME STORE ACTIONS AT THE SAME TIME
- Previous function now returns whole store
`const notes = useSelector(state => state)`
- Change to:
`const notes = useSelector(state => state.notes)`
#### Redux Toolkit
- Action creator stuff is alot of boilerplate
- Use redux toolkit
`npm install @reduxjs/toolkit`
- In `main.jsx`
```js
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({ 
  reducer: {    
    notes: noteReducer,    
    filter: filterReducer  
  }
})
```
- Inside a reducer
```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const generateId = () => {}

const noteSlice = createSlice({  
  name: 'notes',  
  initialState,  
  reducers: {    
    createNote(state, action) {
      const content = action.payload      
      state.push({        
        content,        
        important: false,        
        id: generateId(),      
      })
    },
    toggleImportanceOf(state, action) {      
      const id = action.payload      
      const noteToChange = state.find(n => n.id === id)      
      const changedNote = {         
        ...noteToChange,         
        important: !noteToChange.important       
      }      
      return state.map(note => note.id !== id ? note : changedNote)         
    }  
  },
})
export const {createNote,toggleImportanceOf} = noteSlice.actions
export default noteSlice.reducer
```
- `createSlice` name vale determines prefix
  - createNote reducer has action `note/createNode`
- This transforms 
  - `dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!' })`
  - to
  - `dispatch(createNote('Redux Toolkit is awesome!'))`
- Redux toolkit also lets us mutate the state again
- Can import the reducer and action creators like so:
  - `import noteReducer, { createNote, toggleImportanceOf } from './reducers/noteReducer'`

#### Redux Toolkit and console.log
- `console.log(state)` wont work properly
`import { createSlice, current } from '@reduxjs/toolkit'`
- `console.log(current(state))` wont work properly

#### Redux DevTools
- Chrome tool to view reducer

## Communicating with server in Redux app

- Dont append individually, add them all at once at start

```js
const dispatch = useDispatch()  
useEffect(() => { noteService.getAll().then( notes => dispatch(setNotes(notes))) }, [])
```
- Or for adding to backend:
```js
const addNote = async (event) => {    event.preventDefault()
  const content = event.target.note.value
  event.target.note.value = ''
  const newNote = await noteService.createNew(content)    dispatch(createNote(newNote))  }
```


#### Asynchronous actions and Redux Thunk
- Ideally server communication is abstracted away form server components
- Can do this with `Redux Thunk`
- Inside `noteReducer.js`
```js
export const initializeNotes = () => {  
  return async dispatch => {    
    const notes = await noteService.getAll()    
    dispatch(setNotes(notes))  
  }
}
```
- App component can now use
```js
useEffect(() => { dispatch(initializeNotes()) }, []) 
```
## React Query, useReducer and the context
- Explore `React Query` to add and manage data in server
`npm install @tanstack/react-query`
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```
- Get notes example:
```jsx
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {
  // ...
  const result = useQuery({ // Response is status
    queryKey: ['notes'], // String key
    queryFn: () => axios.get('http://localhost:3001/notes').then(res => res.data) // Still uses axios
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data
  return (
    // ...
  )
}
```
*"However, the HTTP request is completed so quickly that not even Max Verstappen would be able to see the text."* - FullStackOpen
- Put query function in its own service or requests file
#### Synchronizing data to the server using React Query
`export const createNote = newNote =>  axios.post(baseUrl, newNote).then(res => res.data)`
```jsx
import { useQuery, useMutation } from '@tanstack/react-query'
import { getNotes, createNote } from './requests'
const App = () => {
  const newNoteMutation = useMutation({ mutationFn: createNote })
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })  }
}
```
- Saved on server but not updated
- Tell Query old data is invalid
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote } from './requests'
const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }) // Tells Query to fetch notes
    },
  })
  // ...
}
```
- Updating a note:
```js
export const updateNote = updatedNote => 
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)
```
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  // ...
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  } // ...
}
```
#### Optimizing
- After any put its going to force a get
  - Sucks if large db
- Manually update query state!
```js
const newNoteMutation = useMutation({
  mutationFn: createNote,
  onSuccess: (newNote) => {
    const notes = queryClient.getQueryData(['notes'])      
    queryClient.setQueryData(['notes'], notes.concat(newNote))
  }
})
  // ...
```

#### useReducer
- Even with React Query, still need state for things like forms
```jsx
import { useReducer } from 'react'

// Reducer
const counterReducer = (state, action) => {
  switch (action.type) { // Actions we can setup
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}

const App = () => {
  // similar to useState()
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={() => counterDispatch({ type: "INC"})}>+</button>
        <button onClick={() => counterDispatch({ type: "DEC"})}>-</button>
        <button onClick={() => counterDispatch({ type: "ZERO"})}>0</button>
      </div>
    </div>
  )
}

export default App
```
#### Using context for passing the state to components
- Would have to do default prop drilling for multiple components
- `Context API` provides solution
```js
import { createContext } from 'react'

const CounterContext = createContext()

export default CounterContext
```
```jsx
import CounterContext from './CounterContext'

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (

    <CounterContext.Provider value={[counter, counterDispatch]}>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>

    </CounterContext.Provider>
  )
}
```
- Other components use context with `useContext()`
```jsx
import { useContext } from 'react'
import CounterContext from './CounterContext'

const Display = () => {

  const [counter] = useContext(CounterContext)
  return <div>
    {counter}
  </div>
}

const Button = ({ type, label }) => {

  const [counter, dispatch] = useContext(CounterContext)
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}
```
#### Seperate concern into file
```jsx
import { createContext, useReducer } from 'react'

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
        return state + 1
    case "DEC":
        return state - 1
    case "ZERO":
        return 0
    default:
        return state
  }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </CounterContext.Provider>
  )
}

export default CounterContext
```