import { useParams } from 'react-router-dom';
import userService from '../services/users';
import { useEffect, useState } from 'react';

const User = () => {
  const [user, setUser] = useState('');

  const { id } = useParams();
  useEffect(() => {
    userService.getOne(id).then((response) => {
      setUser(response.data);
    });
  }, []);

  console.log(user);
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
