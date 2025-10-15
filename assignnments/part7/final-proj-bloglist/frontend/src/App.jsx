import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Toggelable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const ErrorDisplay = ({ message }) => {
  if (!message) return null
  return (
    <div style={{ color: 'red', marginBottom: '1rem' }}>
      {message}
    </div>
  )
}

const SuccessDisplay = ({ message }) => {
  if (!message) return null
  return (
    <div style={{ color: 'green', marginBottom: '1rem' }}>
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
  const [successMessage, setSuccessMessage] = useState(null)
  const BlogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => setBlogs(sortBlogs(fetchedBlogs)))
  }, [])

  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser')
    if (blogUser) {
      const user = JSON.parse(blogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = async (event, oldBlog) => {
    event.preventDefault()
    const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 }
    try{
      const returnedBlog = await blogService.replaceBlog(updatedBlog)
      setBlogs(sortBlogs(blogs.map(blog => {
        if (blog.id !== oldBlog.id)
          return blog
        else
          return { ...returnedBlog, user: oldBlog.user }
      })))
      setSuccessMessage(`Liked ${oldBlog.title}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    }
    catch (exception) {
      console.error(exception)
      setErrorMessage('Could not like blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const addBlog = async (event, blogObject) => {
    event.preventDefault()
    console.log('Wanted to add a blog')
    try {
      const response = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(response))
      setSuccessMessage(`Added ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => setSuccessMessage(null), 5000)
      BlogFormRef.current.toggleVisibility()
    }
    catch (exception) {
      console.error(exception)
      setErrorMessage('Could not submit')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const removeBlog = async (event, blogObject) => {
    event.preventDefault()
    try {
      if (!confirm(`Are you sure you want to remove Blog: ${blogObject.title}`))
        return
      await blogService.deleteBlog(blogObject)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setSuccessMessage(`Removed ${blogObject.title}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    }
    catch (exception) {
      console.error(exception)
      setErrorMessage('Could not delete')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      console.error(exception)
      setPassword('')
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const sortBlogs = (blogs) => {
    const sortByLikes = (blogA, blogB) => blogB.likes - blogA.likes
    return blogs.sort(sortByLikes)
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
      <SuccessDisplay message={successMessage}/>
      <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('blogUser')
      }}>
      Logout </button>

      <Togglable buttonLabel={'Add blog'} ref={BlogFormRef}>
        <h2>Add Blog</h2>
        <BlogForm submitBlog={addBlog} />
      </Togglable>

      <h2>Blogs</h2>
      <p>{username} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} currentUser={username}/>
      ))}
    </div>
  )
}

export default App