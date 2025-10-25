import { useEffect, useRef } from 'react';

import Togglable from './components/Toggelable';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import NavMenu from './components/NavMenu';

import { updateUser, clearUser } from './reducers/userReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import blogService from './services/blogs';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  const user = useSelector((store) => store.user);
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
        <NavMenu username={user.username} />
        <h1>Blog App</h1>
        <Notification />
      </>
    );
  };

  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
