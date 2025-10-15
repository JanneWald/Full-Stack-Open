const LoginForm = ({
  onLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <div>
    <h1>Login</h1>
    <form onSubmit={onLogin}>
      <div>
        <label>
          Username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>Login</button>
    </form>
  </div>
);

export default LoginForm;
