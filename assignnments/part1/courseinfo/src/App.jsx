const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1 + exercises2 + exercises3

  return (
    <div>
      <Header name={course}/>

      <Content part={part1} num={exercises1}/>
      <Content part={part2} num={exercises2}/>
      <Content part={part3} num={exercises3}/>

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
const Content = (prop) => {
  return (
    <p>
      {prop.part} {prop.num}
    </p>
  )
}


export default App