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
      const user = JSON.parse(blogUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const likeBlog = async (event, oldBlog) => {
    event.preventDefault();
    const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
    try {
      const returnedBlog = await blogService.replaceBlog(updatedBlog);
      setBlogs(
        sortBlogs(
          blogs.map((blog) => {
            if (blog.id !== oldBlog.id) return blog;
            else return { ...returnedBlog, user: oldBlog.user };
          })
        )
      );
      dispatch(createNotification('Liked Blog'));
    } catch (exception) {
      console.error(exception);
      dispatch(createNotification('Could not like Blog'));
    }
  };

  const submitBlog = async (event, blogObject) => {
    event.preventDefault();
    dispatch(createBlog(blogObject));
    BlogFormRef.current.toggleVisibility();
  };

  const removeBlog = async (event, blogObject) => {
    event.preventDefault();
    try {
      if (!confirm(`Are you sure you want to remove Blog: ${blogObject.title}`))
        return;
      await blogService.deleteBlog(blogObject);
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
      dispatch(createNotification(`Removed ${blogObject.title}`));
    } catch (exception) {
      console.error(exception);
      dispatch(createNotification('Could not delete'));
    }
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
      <BlogList
        likeBlog={likeBlog}
        username={username}
        removeBlog={removeBlog}
      />
    </div>
  );
};

export default App;
