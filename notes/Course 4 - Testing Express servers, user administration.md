Here is an example of good project structure 
```txt
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```
#### Exporting Functions
- Imagine two methods
```js
const info(...params) => {//..../}
// error ...

module.exports = { info, error }
```
- Can be called via dot notation or broken down with `require()`
```js
const logger = require('./utils/logger')
logger.info('example')

// or

const { info, error } = require('./utils/logger')
info('example')
```
## Testing in Node
- There are lots of testing libraries
- Add to npm script to test:
```json
    "test": "node --test",
```
- Use built in Node `node:test` libary
```js
const { test } = require('node:test') // Test funciton
const assert = require('node:assert') // Assertion function

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})
```
- `node --test` automatically runs tests in files ending in `.test.js`

```js
describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })
```
- Adds a descriptor to the testing output