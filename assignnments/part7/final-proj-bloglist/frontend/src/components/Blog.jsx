import { likeBlogByBlog, removeBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector((store) => store.blogs.find((b) => b.id === id));
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
