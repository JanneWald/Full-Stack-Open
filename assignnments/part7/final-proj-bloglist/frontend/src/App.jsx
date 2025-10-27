import { useEffect } from 'react';

import './App.css';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import Users from './components/Users';
import User from './components/User';
import NavMenu from './components/NavMenu';

import { updateUser, clearUser } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
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

  return (
    <div className='container'>
      <NavMenu username={user.username} />
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
