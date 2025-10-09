import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from './requests'
import { useNotification } from './notification'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const { setNotification } = useNotification()
  
  if (result.isLoading)
    return <>getting anecdotes...</>

  if (result.isError)
    return <>Error Getting Anecdotes, try again</>

  const anecdotes = result.data
  
  const handleVote = (anecdote) => {
    console.log('vote')
    setNotification(`Voted for "${anecdote.content}"`)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
