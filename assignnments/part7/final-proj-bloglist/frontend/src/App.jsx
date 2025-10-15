import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Toggelable';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';
import { createNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import BlogList from './components/BlogList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const BlogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser');
    if (blogUser) {
      const storedUser = JSON.parse(blogUser);
      console.log('stored user', storedUser);
      setUser(storedUser);
      blogService.setToken(storedUser.token);
      setUsername(storedUser.username);
    }
  }, []);

  const submitBlog = async (event, blogObject) => {
    event.preventDefault();
    dispatch(createBlog(blogObject));
    BlogFormRef.current.toggleVisibility();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('blogUser', JSON.stringify(user));
      setPassword('');
      blogService.setToken(user.token);
    } catch (exception) {
      console.error(exception);
      setPassword('');
      dispatch(createNotification('Wrong credentials'));
    }
  };

  const sortBlogs = (blogs) => {
    const sortByLikes = (blogA, blogB) => blogB.likes - blogA.likes;
    return blogs.sort(sortByLikes);
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm
          onLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <button
        onClick={() => {
          setUser(null);
          window.localStorage.removeItem('blogUser');
        }}
      >
        Logout{' '}
      </button>

      <Togglable buttonLabel={'Add blog'} ref={BlogFormRef}>
        <h2>Add Blog</h2>
        <BlogForm submitBlog={submitBlog} />
      </Togglable>

      <h2>Blogs</h2>
      <p>{username} logged in</p>
      <BlogList username={username} />
    </div>
  );
};

export default App;
