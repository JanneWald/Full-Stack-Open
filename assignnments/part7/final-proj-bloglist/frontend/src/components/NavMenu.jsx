import { useDispatch } from 'react-redux';
import { clearUser } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const NavMenu = ({ username }) => {
  const dispatch = useDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      <Link to={'/'} style={{ marginRight: 10 }}>
        blogs
      </Link>
      <Link to={'/users'} style={{ marginRight: 10 }}>
        users
      </Link>
      {username} logged in
      <button
        style={{ marginLeft: 10 }}
        onClick={() => {
          dispatch(clearUser());
          window.localStorage.removeItem('blogUser');
        }}
      >
        Logout{' '}
      </button>
    </div>
  );
};

export default NavMenu;
