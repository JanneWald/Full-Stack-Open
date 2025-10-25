import { useField } from '../hooks/index';
import { Table, Form, Button } from 'react-bootstrap';

const BlogForm = ({ submitBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  return (
    <div>
      <Form
        onSubmit={(event) =>
          submitBlog(event, {
            title: title.value,
            author: author.value,
            url: url.value,
          })
        }
      >
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control {...title} name='title' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author: </Form.Label>
          <Form.Control {...author} name='author' />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL: </Form.Label>
          <Form.Control {...url} name='url' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
