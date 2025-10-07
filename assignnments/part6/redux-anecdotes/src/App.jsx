import AnnecdoteForm from './components/AnecdoteForm'
import AnnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter/>
      <AnnecdoteList />
      <h2>create new</h2>
      <AnnecdoteForm />

    </div>
  )
}

export default App