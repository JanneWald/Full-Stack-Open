const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 },
  ]
  let total = 0
  for (let i = 0; i < parts.length; i++){
    total += parts[i].exercises
  }

  return (
    <div>
      <Header name={course}/>

      <Content parts={parts}/>

      <Total total={total}/>
    </div>
  )
}
// Renders name of course
const Header = (prop) => {
  return (
    <h1>{prop.name}</h1>
  )
}
// Renders number of exercises
const Total = (prop) => {
  return (
    <p>
      Number of exercises = {prop.total}
    </p>
  )
}
// Renders parts and number of exercises
const Part = (prop) => {
  return (
    <p>
      {prop.part} {prop.num}
    </p>
  )
}

// Renders parts and number of exercises
const Content = (prop) => {
  return (
    <div>
    <Part part={prop.parts[0].part} num={prop.parts[0].exercises} />
    <Part part={prop.parts[1].part} num={prop.parts[1].exercises} />
    <Part part={prop.parts[2].part} num={prop.parts[2].exercises} />

    </div>
  )
}


export default App