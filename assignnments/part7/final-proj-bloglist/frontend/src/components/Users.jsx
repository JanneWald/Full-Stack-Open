import { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';
import { Table, Container, Spinner } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((response) => setUsers(response.data));
  }, []);

  if (users.length === 0)
    return (
      <Container className='text-center mt-5'>
        <Spinner animation='border' role='status' variant='primary' />
        <div className='mt-3 text-muted'>Loading users...</div>
      </Container>
    );

  return (
    <Container className='mt-5'>
      <h2 className='mb-4 text-primary fw-semibold'>All Users</h2>
      <Table
        striped
        bordered
        hover
        responsive
        className='shadow-sm align-middle'
      >
        <thead className='table-primary'>
          <tr>
            <th>Name</th>
            <th>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
