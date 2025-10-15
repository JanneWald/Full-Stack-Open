import { useState, useEffect, useRef } from 'react';
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
import { useSelector } from 'react-redux';
import { updateUser, clearUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector((store) => store.user);
  const BlogFormRef = useRef();
  const dispatch = useDispatch();

  console.log('User:', user);

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

  return (
    <div>
      <Notification />
      <button
        onClick={() => {
          dispatch(clearUser());
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
      <p>{user.username} logged in</p>
      <BlogList username={user.username} />
    </div>
  );
};

export default App;
