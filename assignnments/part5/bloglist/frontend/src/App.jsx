import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLoging = async (event) => {
    event.preventDefault()
    console.log('Starting the login service with username, ')
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)    
      setUsername('')
      setPassword('')
    } catch (exception) {
      setPassword('')
      setErrorMessage('wrong credentials')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
      console.log(exception)
    }
  }
  
  const ErrorDisplay = ({ message }) => {
    if (!message) return null
    return <div style={{ color: 'red' }}>{message}</div>
  }

  const LoginForm = () => {
    return (
      <>
        <h1>Login here</h1>
        <form onSubmit={handleLoging}>
          <div>          
            <label>            
              username            
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />          
            </label>
          </div>        
          <div>          
            <label>            
              password            
              <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />          
            </label>        
          </div>        
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user == null){
    return (
      <>
        <ErrorDisplay message={errorMessage}/>
        <LoginForm />
      </>
    )
  }
  return (
    <div>
      <ErrorDisplay message={errorMessage}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App