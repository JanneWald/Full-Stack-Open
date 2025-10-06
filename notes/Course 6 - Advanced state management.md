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