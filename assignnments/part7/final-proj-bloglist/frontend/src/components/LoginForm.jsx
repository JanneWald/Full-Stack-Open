import { useField } from '../hooks/index';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { updateUser } from '../reducers/userReducer';
import { createNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input {...username} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input {...password} />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
