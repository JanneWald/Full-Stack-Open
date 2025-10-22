import { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((response) => setUsers(response.data)); // axios wraps data
  }, []);

  console.log(users); // now contains your users once fetched

  return (
    <>
      <h1>Users page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
