import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const anecdote = await blogService.addBlog(blog);
      dispatch(addBlog(anecdote));
      dispatch(createNotification(`Added ${blog.title} by ${blog.author}`));
    } catch (exception) {
      console.log(exception);
      dispatch(createNotification('Could not add blog.', exception.message));
    }
  };
};
