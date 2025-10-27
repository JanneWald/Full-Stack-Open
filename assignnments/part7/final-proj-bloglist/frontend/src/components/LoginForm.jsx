import { useField } from '../hooks/index';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { updateUser } from '../reducers/userReducer';
import { createNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      dispatch(updateUser(user));
      window.localStorage.setItem('blogUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      console.error(exception);
      dispatch(createNotification('Wrong credentials'));
    }
  };

  return (
    <div className='d-flex justify-content-center mt-5'>
      <Card className='p-3 mt-3 shadow-sm'>
        <Card.Body>
          <h1>Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} name='username' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} name='username' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default LoginForm;
