import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from '../requests'
import { useNotification } from '../notification'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],
        anecdotes
          .map(a =>
            a.id === updatedAnecdote.id ? updatedAnecdote : a
          ).sort((a, b) => 
            b.votes - a.votes
          )
      )
      setNotification(`You voted for "${updatedAnecdote.content}"`)
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
