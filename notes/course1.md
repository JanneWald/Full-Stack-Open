## JavaScript

#### Variables
`let` - makes normal variable
`const` - makes an immutable variable
`var` - usable interchangable

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

'map' creates a variable from a foreach
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

