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
    likeBlog(state, action) {
      const id = action.payload;
      return state
        .map((blog) => {
          if (blog.id !== id) return blog;
          else return { ...blog, likes: blog.likes + 1 };
        })
        .sort((a, b) => b.likes - a.likes);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      console.log('deleting', id);
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { addBlog, setBlogs, likeBlog, deleteBlog } = blogSlice.actions;
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

export const likeBlogByBlog = (oldBlog) => {
  return async (dispatch) => {
    try {
      console.log('going to update', oldBlog);
      const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
      await blogService.replaceBlog(updatedBlog);
      dispatch(likeBlog(oldBlog.id));
      dispatch(createNotification('Liked Blog'));
    } catch (exception) {
      console.log(exception);
      dispatch(createNotification('Could not like blog'));
    }
  };
};

export const removeBlog = (oldBlog) => {
  return async (dispatch) => {
    try {
      console.log('going to delete', oldBlog.id);
      await blogService.deleteBlog(oldBlog);
      dispatch(deleteBlog(oldBlog.id));
      dispatch(createNotification('Removed Blog'));
    } catch (exception) {
      console.log(exception);
      dispatch(createNotification('Could not remove blog'));
    }
  };
};
