import AnnecdoteForm from './components/AnecdoteForm'
import AnnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnnecdoteList />
      <h2>create new</h2>
      <AnnecdoteForm />

    </div>
  )
}

export default App