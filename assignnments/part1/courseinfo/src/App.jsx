const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const total = part1.exercises + part2.exercises + part3.exercises

  return (
    <div>
      <Header name={course}/>

      <Content part1={part1} part2={part2} part3={part3}/>

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
  console.log(prop)
  return (
    <div>
    <Part part={prop.part1.name} num={prop.part1.exercises} />
    <Part part={prop.part2.name} num={prop.part2.exercises} />
    <Part part={prop.part3.name} num={prop.part3.exercises} />

    </div>
  )
}


export default App