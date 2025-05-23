import { useState } from 'react'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name} </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td> 
    <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  const total = good + neutral + bad
  const average = (good - bad) / total 
  const positive = `${good / total * 100}%`
  if (good + neutral + bad > 0)
    return(
      <div>
        <h1>stats</h1>
        <table>
        <StatisticsLine text="Good" value={good}/>
        <StatisticsLine text="Nuetral" value={neutral}/>
        <StatisticsLine text="Bad" value={bad}/>
        <StatisticsLine text="Total" value={total}/>
        <StatisticsLine text="Average" value={average}/>
        <StatisticsLine text="Positive" value={positive}/>
        </table>
      </div>
    )
  else
    return(
  <div>
    <h1>stats</h1>
    No feedback yet
  </div>)
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App