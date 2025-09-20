import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const ErrorDisplay = ({ message }) => {
  if (!message) return null
  return (
    <div style={{ color: 'red', marginBottom: '1rem' }}>
      {message}
    </div>
  )
}

const LoginForm = ({ onLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h1>Login</h1>
    <form onSubmit={onLogin}>
      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => setBlogs(fetchedBlogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      setPassword('')
    } catch (exception) {
      console.error(exception)
      setPassword('')
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <ErrorDisplay message={errorMessage} />
        <LoginForm
          onLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <ErrorDisplay message={errorMessage} />
      <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('blogUser')
      }}> 
      Logout</button>
      <h2>Blogs</h2>
      <p>{username} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App