import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = ({ likeBlog, removeBlog, username }) => {
  const blogs = useSelector((store) => store.blogs);

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          currentUser={username}
        />
      ))}
    </>
  );
};

export default BlogList;
