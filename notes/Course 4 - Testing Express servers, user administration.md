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