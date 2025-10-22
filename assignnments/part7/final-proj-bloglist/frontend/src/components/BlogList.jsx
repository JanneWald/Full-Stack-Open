import { useSelector } from 'react-redux';
import Blog from './Blog';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs);

  return (
    <>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}, by {blog.author}
        </Link>
      ))}
    </>
  );
};

export default BlogList;
