import { useState } from 'react'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name} </button>
  )
}

const Average = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total == 0)
    return (
      <p>Average: 0</p>
    )
  else{
    return(
      <p>Average: {(good - bad) / total}</p>
    )
  }
}

const Positive = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total == 0)
    return (
      <p>Positive: 0%</p>
    )
  else{
    return(
      <p>Positive: {(good + neutral) / total * 100}%</p>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button name="bad" handleClick={() => setBad(bad + 1)}/>
      <h1>stats</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total:{good + neutral + bad}</p>
      <Average good={good} neutral={neutral} bad={bad}/>
      <Positive good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App