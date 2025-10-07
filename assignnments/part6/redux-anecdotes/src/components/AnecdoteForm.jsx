import { addAnecdote } from '../reducers/anecdoteReducer' 
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`Added: ${anecdote}`))
    setTimeout(() => {dispatch(setNotification(''))}, 5000)
  }

  return(
    <form onSubmit={submitAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm