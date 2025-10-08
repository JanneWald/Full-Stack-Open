## Log in to frontend
#### Conditional Login of a login form
```jsx
const App = () => {
  // ...
  const loginForm = () => (
    // ...
  )
  const noteForm = () => (
    // ...
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}      
      {user && noteForm()}
  )
```
- Only renders the component if previous value true.
#### Saving token to browser
- If we refresh we use all state including token
```js
window.localStorage.setItem('name', 'juha tauriainen')
```
- Saves to browser key:pair database
- Pulled with 
```js
window.localStorage.getItem('name')
```
- `removeItem()` removes it
- Only stores json, must be converted then reconverted
- Canv view databse in web console `window.localStorage`
```js
const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
```
- Might need a proxy if we are hosting on the same device
- In vite config
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
```
- Any request to `localhost:5437/api` will be redirected to `localhost:3001` where express server is 

## Props.children and prototpyes
- Say we want to have expandable forms to save screen space
```jsx
const App = () => {

  const [loginVisible, setLoginVisible] = useState(false)

  // ...

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
          // ...
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // ...
}
```
- This uses `sytle:none` to hide a component via css
#### Making a toggleable component
```jsx
import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children} // Inserts embedded react component children inside toggleable class
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
```
#### State in forms
Put state in forms compnent instead of App.jsx!!!
#### Ref
Create ref and link it to a component
```jsx
import { useState, useEffect, useRef } from 'react'

const App = () => {
  // ...

  const noteFormRef = useRef()

  const noteForm = () => (

    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  // ...
}
```
LINK THROUGH RENDERS
```jsx
  useImperativeHandle(props.ref, () => {    
    return { toggleVisibility }  
  })
  ```
Call with:
  ```jsx
  const App = () => {
  // ...
  const addNote = (noteObject) => {

    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {     
        setNotes(notes.concat(returnedNote))
      })
  }
  // ...
}
```
## Testing React Apps
- Can use `ViteTest` for component testing
```bash
npm install --save-dev vitest jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
```
- Add `"test": "vitest run"` to `scripts:` in `package.json`
- Make a new file, `testSetup.js`
```js
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})
```
- Add env to `vite.config.js`
```js
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    globals: true, // Makes us not need describe, test, expect
    setupFiles: './testSetup.js', 
  }
})
```
#### Rendering component
- Write test for `src/components/Note.test.jsx`, same dir as Note.jsx
   - Can keep them in a seperate folder. Preference
```jsx
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
```
- Dont actually need `expect()`, `getByText()` is already a test that can fail
- `getByText(param)` looks for component with ONLY param
- `findByText(param)` looks for component including param, RETURNS A PROMISE so await
- `queryByText()` same as find, but doesnt throw exception
- `getTestById()` you get it.
#### Debugging
- `screen.debug()` prints html of screen to console
- `screen.debug(element)` ^^^ of element to console
To simulate user input:
`npm install --save-dev @testing-library/user-event`
```jsx
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import Note from './Note'

// ...

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn() // comes from vitest

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup() // session start
  const button = screen.getByText('make not important')
  await user.click(button) // click button

  expect(mockHandler.mock.calls).toHaveLength(1) // Array of calls is len(one) "has only been called once"
})
```

#### Testing Forms
Testing a NoteForm:
```jsx
import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
```
What about 2 inputs?
```jsx
const inputs = screen.getAllByRole('textbox')

await user.type(inputs[0], 'testing a form...')
```
Or if placeholder text is present
```jsx
<input
//...
placeholder='write note content here'
/>
```
- Use `const input = screen.getByPlaceholderText('write note content here')`
#### Test coverage?
- `npm test -- --coverage`
- Will need to add /coverage to .gitignore

## Playwright testing
- End to end test dont need to be in the same dir
`npm init playwright@latest`
```js
{
  // ...
  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report"
  },
  // ...
}
```
- Can run test via graphical ui `npm run test -- --ui`
```js
// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```
#### Our code example
- Add script in backend
```js
  "start:test": "cross-env NODE_ENV=test node --watch index.js"
```
- Run backend and frontned
- Make file `test/note_app.spec.js`:
```js
const { test, describe, expect } = require('@playwright/test')

describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })
})
```
- Failing test can take long because it does 30 sec retries
   - Shorten in `playwright.config.js`:
```js
      export default defineConfig({
      // ...
      timeout: 3000,  fullyParallel: false,  workers: 1,  // ...
    })
```
#### Writing on Form
```js
describe('Note app', () => {
  // ...
  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: 'login' }).click()

    const textboxes = await page.getByRole('textbox').all() // Could also use first(), last() if only 2
    await textboxes[0].fill('mluukkai')
    await textboxes[1].fill('salainen')

    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })  
})
```
- Can also use other methods
  - `getByLabel(label)`
  - `getById(id)`

#### Init
- Dont forget to add beforeEach as the first method in a describe()
`beforeEach(async ({ page }) => { await page.goto('http://localhost:5173') })`

#### Form submisison
```js
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  // ....

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
})
```
#### Database management
- Ideally we have endpoints for testing
- Make a testing router
```js
const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
```
- Use testing router if in dev mode
- Reset and add new user in before each
```js
//..
beforeEach(async ({ page, request }) => {
  await request.post('http://localhost:3001/api/testing/reset')
  await request.post('http://localhost:3001/api/users', {
    data: {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
  })
}
  //...
```
#### Failed login test
```js
test('login fails with wrong password', async ({ page }) =>{
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill('mluukkai')
  await page.getByLabel('password').fill('wrong')
  await page.getByRole('button', { name: 'login' }).click()

  const errorDiv = page.locator('.error')
  await expect(errorDiv).toContainText('wrong credentials')
  await expect(errorDiv).toHaveCSS('border-style', 'solid')
  await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

  await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()})
  ```
#### Only
- Can append any `test(...)` with `test.only(...)`
  - Only runs those tests

#### Helpers
- Use helpers for login and note creation
- Can also simplify urls:
  - Proxy lets us adress to frontend port to reach backeng
  - Playwright config lets us define baseurl
```js
export default defineConfig({
  // ...
  use: {
    baseURL: 'http://localhost:5173',
    // ...
  },
  // ...
})
```
#### Debug
- If something dont work, use debugger:
`npm test -- -g'one of those can be made nonimportant' --debug`

