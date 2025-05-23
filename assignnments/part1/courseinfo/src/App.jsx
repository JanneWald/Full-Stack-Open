const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>

      <Content parts={course.parts}/>

      <Total parts={course.parts}/>
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
  let sum = 0
  prop.parts.forEach(part => sum += part.exercises)
  return (
    <p>
      Number of exercises = {sum}
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
    <Part part={prop.parts[0].name} num={prop.parts[0].exercises} />
    <Part part={prop.parts[1].name} num={prop.parts[1].exercises} />
    <Part part={prop.parts[2].name} num={prop.parts[2].exercises} />

    </div>
  )
}


export default App