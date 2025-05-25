import { useState } from 'react'

// Makes button with an onclick function and name
const Button = ({name, handleClick}) => {
  return (
    <div>
    <button onClick={handleClick}>{name}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Stateful index of quote
  const [selected, setSelected] = useState(0)
  // Make a list
  const [votes, setVotes] = useState(() => anecdotes.map(() => 0))
  // Highest vote frequency
  const [popular_freq, setFreq] = useState(0)
  // Highest vote index
  const [popular, setPopular] = useState(0)


  console.log(votes)

    const handleNext = () =>{
    const num = Math.floor(Math.random(0) * anecdotes.length)
    console.log("Selected index:", num)
    setSelected(num);
  }

    const handleVote = () =>{
    console.log("Adding 1 to", votes[selected])
    votes[selected] += 1
    const new_votes={...votes, selected: votes[selected] + 1}
    setVotes(new_votes)

    // Keep track of highest anecdote
    if(votes[selected] > popular_freq){
      console.log(popular, "is the most popular index with a count of", popular_freq)
      setPopular(selected)
      setFreq(votes[selected])
    }
  }
  
  const quote = anecdotes[selected]
  console.log(quote)
  console.log(votes)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      has {votes[selected]} votes
      <Button name="Next anecdote" handleClick={handleNext}/>
      <Button name="Vote" handleClick={handleVote}/>
      <h1>Most voted anecdote</h1>
      {anecdotes[popular]}
    </div>

  )
}

export default App