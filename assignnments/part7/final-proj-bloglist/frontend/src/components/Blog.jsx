import {
  likeBlogByBlog,
  removeBlog,
  commentOnBlog,
} from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useField } from '../hooks';
import {
  Form,
  Button,
  Card,
  ListGroup,
  Spinner,
  Container,
} from 'react-bootstrap';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const comment = useField('text');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!comment.value.trim()) return;
    dispatch(commentOnBlog(id, comment.value));
    comment.reset(); // assuming your useField supports reset
  };

  return (
    <Form onSubmit={onSubmit} className='mt-3'>
      <Form.Group className='d-flex gap-2'>
        <Form.Control
          {...comment}
          placeholder='Write a comment...'
          className='shadow-sm'
        />
        <Button type='submit' variant='primary'>
          Add
        </Button>
      </Form.Group>
    </Form>
  );
};

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((store) => store.blogs.find((b) => b.id === id));
  const appUser = useSelector((store) => store.user);

  if (!blog) {
    return (
      <Container className='text-center mt-5'>
        <Spinner animation='border' role='status' variant='primary' />
        <div className='mt-3 text-muted'>Finding blog...</div>
      </Container>
    );
  }

  const { title, author, url, likes, comments } = blog;
  const blogUser = blog.user || { username: 'unknown' };

  return (
    <Container className='mt-5'>
      <Card className='shadow-sm border-0'>
        <Card.Body>
          <Card.Title className='text-primary fs-4 fw-semibold'>
            {title}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>by {author}</Card.Subtitle>

          <Card.Text className='mt-3'>
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-decoration-none'
            >
              {url}
            </a>
          </Card.Text>

          <div className='d-flex align-items-center gap-3 mt-3'>
            <span className='fw-medium'>❤️ {likes} Likes</span>
            <Button
              variant='outline-primary'
              size='sm'
              onClick={() => dispatch(likeBlogByBlog(blog))}
            >
              Like
            </Button>
          </div>

          <p className='mt-3 mb-0 text-muted'>
            Added by <strong>{blogUser.username}</strong>
          </p>

          {blogUser.username === appUser.username && (
            <Button
              variant='outline-danger'
              size='sm'
              className='mt-2'
              onClick={() => dispatch(removeBlog(blog))}
            >
              Delete Blog
            </Button>
          )}
        </Card.Body>
      </Card>

      <Card className='mt-4 shadow-sm border-0'>
        <Card.Body>
          <Card.Title className='fs-5 fw-semibold text-primary mb-3'>
            Comments
          </Card.Title>
          <CommentForm id={id} />

          {comments.length > 0 ? (
            <ListGroup variant='flush' className='mt-3'>
              {comments.map((comment, idx) => (
                <ListGroup.Item key={idx} className='border-0 ps-0'>
                  💬 {comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className='text-muted mt-3'>No comments yet. Be the first!</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Blog;
