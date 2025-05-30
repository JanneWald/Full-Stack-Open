## JavaScript

#### Variables
`let` - makes normal variable
`const` - makes an immutable variable
`var` - usable interchangeable

#### Arrays
Construct like normal
```js
const t = [1, -1, 3]

t.push(5) // Adding
```

Loop through like:
```js
t.forEach(value => {
  console.log(value)
})       
```
requires a lambda, first variable is the item in list

to make *new* copy

```js
const t = [1, -1, 3]

const t2 = t.concat(5)  // creates new array

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

`map` saves a new a list from a for each command
```js
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   
// [2, 4, 6] is printed

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```

#### Objects
- Object literals by listing properties within braces.
```js
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}
```
- Properties can be added at will

#### Functions
- All functions are lambdas
```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
```
- No parentheses needed if only one parameter
- No bracket/extra lines if return is a singular expression
- Technically can use `function funcName(a, b){return ...}` but its lame

#### Component helper functions
- Can add helper functions in {} before return
- *Destructing* split prop into original values
```js
const Hello = (props) => {
  const { name, age } = props  const bornYear = () => new Date().getFullYear() - age
```
**or**
```js
const Hello = ({ name, age }) => {  const bornYear = () => new Date().getFullYear() - age
```git

#### Stateful component
```js
// Get useState module
import { useState } from 'react'
const App = () => {
    // counter is the val to keep track of, setCounter is a setter function provided to you that causes a retrigger
    const [ counter, setCounter ] = useState(0)

    // Every render set 1000ms call to set counter
    setTimeout(
        () => setCounter(counter + 1),
        1000
  )

  console.log('rendering...', counter)

  return (
    <div>{counter}</div>
  )
}
```
This displays a num that increases by 1 every second

#### Event handling
- Adding a mouse click handler to a buttong
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
        console.log('clicked')
  }

    // handler can also be ineline with attribute like:
    // onClick={() => console.log("Clicked")}
return (
    <div>
      <div>{counter}</div>

      <button onClick={handleClick}> 
        plus
      </button>
    </div>
  )
}
```
**An event handler is a function or function reference**
- It is better to give function reference then straight jsx lambda
```js
increaseByOne = () => setCounter(counter = 1)
```
#### Passing state
- make components small and reusable
- multiple variables from a singular state, left/right
```js
const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

    // "Cleaner version, ...obj tells it to copy all attributes. add a ',' specifies one"
  const handleRightClick = () => {
    const newClicks = { 
      ...clicks,
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
```

**Do not define components in components**