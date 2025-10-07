import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './reducers/anecdoteReducer'
import AnnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }



  const sortVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(sortVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      
      <h2>create new</h2>
      <AnnecdoteForm />

    </div>
  )
}

export default App