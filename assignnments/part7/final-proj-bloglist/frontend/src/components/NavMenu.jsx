import { useDispatch } from 'react-redux';
import { clearUser } from '../reducers/userReducer';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button, NavLink } from 'react-bootstrap';

const NavMenu = ({ username }) => {
  const dispatch = useDispatch();

  const padding = { marginLeft: 10, marginRight: 10 };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nar' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='meAuto'>
          <Nav.Link href='#' as='span'>
            <Link to={'/'} style={padding}>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to={'/users'} style={padding}>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <em style={padding}> {username} logged in</em>
          </Nav.Link>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => {
              dispatch(clearUser());
              window.localStorage.removeItem('blogUser');
            }}
          >
            Logout{' '}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavMenu;
