import { useState } from 'react';
import { likeBlogByBlog, removeBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false);
  const { title, author, url, likes } = blog;
  const appUser = useSelector((store) => store.user);

  let blogUser = blog.user;
  if (!blogUser) blogUser = { username: 'unknown' };
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className='blog-details'>
      <p>
        <i>{title}</i>{' '}
        <button
          onClick={() => {
            setDetailedView(false);
          }}
        >
          Hide Details
        </button>
      </p>
      <p>By: {author}</p>
      <p>{url}</p>
      <p>
        Likes: {likes}{' '}
        <button onClick={() => dispatch(likeBlogByBlog(blog))}> Like</button>
      </p>
      <p>Added by: {blogUser.username}</p>
      {blogUser.username === appUser.username && (
        <button onClick={() => dispatch(removeBlog(blog))}>Delete</button>
      )}
    </div>
  );
};

export default Blog;
