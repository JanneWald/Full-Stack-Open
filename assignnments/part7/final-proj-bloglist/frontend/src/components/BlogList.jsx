import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import Togglable from './Toggelable';
import BlogForm from './BlogForm';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

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
        <Togglable buttonLabel={'Create new blog'} ref={BlogFormRef}>
          <h2>Add Blog</h2>
          <BlogForm submitBlog={submitBlog} />
        </Togglable>
      </div>
      <>
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}, by {blog.author}
          </Link>
        ))}
      </>
    </div>
  );
};

export default BlogList;
