import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    console.log('adding this guy: ', anecdote)

    dispatch(voteForAnecdote(id, anecdote.votes))
    dispatch(setNotification(`Voted for: ${anecdote.content}`))
    setTimeout(() => {dispatch(setNotification(''))}, 5000)
  }

  const sortVotes = (a, b) => b.votes - a.votes
  
  return (
    <>
      {filteredAnecdotes.sort(sortVotes).map(anecdote =>
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
  </>
  )
}

export default AnecdoteList