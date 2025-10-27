import { useDispatch, useSelector } from 'react-redux';
import Togglable from './Toggelable';
import BlogForm from './BlogForm';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Table, Card } from 'react-bootstrap';
import { createBlog } from '../reducers/blogReducer';

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs);
  const BlogFormRef = useRef();
  const dispatch = useDispatch();

  const submitBlog = async (event, blogObject) => {
    event.preventDefault();
    dispatch(createBlog(blogObject));
    BlogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <div>
        <Togglable buttonLabel='Create new blog' ref={BlogFormRef}>
          <Card className='p-3 mt-3 shadow-sm'>
            <Card.Body>
              <h2 className='mb-3'>Add Blog</h2>
              <BlogForm submitBlog={submitBlog} />
            </Card.Body>
          </Card>
        </Togglable>
      </div>
      <Table hover bordered responsive className='shadow-sm mt-3'>
        <thead className='table-primary'>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link
                  className='text-decoration-none fw-semibold'
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
