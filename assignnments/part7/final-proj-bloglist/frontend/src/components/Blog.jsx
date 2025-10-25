import {
  likeBlogByBlog,
  removeBlog,
  commentOnBlog,
} from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useField } from '../hooks/index';
import { Form, Button } from 'react-bootstrap';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const comment = useField('text');

  const onSubmit = (event) => {
    console.log(comment.value);
    event.preventDefault();
    dispatch(commentOnBlog(id, comment.value));
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>
            <Form.Control {...comment} />
          </Form.Label>
          <Button type='submit'> Add comment</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((store) => store.blogs.find((b) => b.id === id));
  const appUser = useSelector((store) => store.user);

  if (!blog) {
    return <>Finding Blog...</>;
  }

  const { title, author, url, likes, comments } = blog;
  let blogUser = blog.user;
  if (!blogUser) blogUser = { username: 'unknown' };

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
        <Button onClick={() => dispatch(likeBlogByBlog(blog))}> Like</Button>
      </p>
      <p>Added by: {blogUser.username}</p>
      {blogUser.username === appUser.username && (
        <Button variant='danger' onClick={() => dispatch(removeBlog(blog))}>
          Delete
        </Button>
      )}
      <h4>Comments:</h4>
      <CommentForm id={id} />
      <ul>
        {comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
