import { useEffect, useRef } from 'react';

import Togglable from './components/Toggelable';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Home from './components/Home';
import Users from './components/Users';

import { updateUser, clearUser } from './reducers/userReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import blogService from './services/blogs';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const user = useSelector((store) => store.user);
  const BlogFormRef = useRef();
  const dispatch = useDispatch();

  console.log('Application user:', user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser');
    if (blogUser) {
      try {
        const storedUser = JSON.parse(blogUser);
        dispatch(updateUser(storedUser));
        blogService.setToken(storedUser.token);
      } catch {
        dispatch(clearUser());
      }
    }
  }, []);

  const submitBlog = async (event, blogObject) => {
    event.preventDefault();
    dispatch(createBlog(blogObject));
    BlogFormRef.current.toggleVisibility();
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  const Header = () => {
    return (
      <>
        <Notification />
        <h1>Blog App</h1>
        <p>{user.username} logged in</p>
        <button
          onClick={() => {
            dispatch(clearUser());
            window.localStorage.removeItem('blogUser');
          }}
        >
          Logout{' '}
        </button>
      </>
    );
  };

  return (
    <Router>
      <Header />
      <div>
        <Togglable buttonLabel={'Add blog'} ref={BlogFormRef}>
          <h2>Add Blog</h2>
          <BlogForm submitBlog={submitBlog} />
        </Togglable>
      </div>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
