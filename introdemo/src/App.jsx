const App = () => {
  const now = new Date()
  const a = 10
  const b = 9

  const name = "Janne"
  const fruits = ["Apple", "Pear"]
  // Print objects to the console
  console.log(now, a , b)
  console.log("What the hell is a COMPONEEEEEEEEENT")
  return (
    <div>
      {/*We do dynamic things within HTML*/}
      <h1>{now.toString()}</h1>

      <Hello />
      {/*We can use components multiple times */}
      <Hello /> 

      {/* Tell prop to shout my name */}
      <Prop name={name} age={22}/>
      
      <p>{a}+{b} should be 21</p>
      <p>{a}+{b} is actually {a + b}</p>

      <p>{fruits}</p>

    </div>
  )
}

// Hello World component
const Hello = () => {
  return (
    <> {/* Don't have to include an extra <div>, can use empty <>*/}
    <p>Hello World</p>
    </>
  )
}

// Passing in function. "Prop"
const Prop = (props) => {
  return (
    <div>
      <p>This is a prop for {props.name}, who is {props.age} years old</p>
    </div>
  )
}

export default App