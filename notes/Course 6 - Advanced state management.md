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
