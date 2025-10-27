import { useDispatch } from 'react-redux';
import { clearUser } from '../reducers/userReducer';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';

const NavMenu = ({ username }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    window.localStorage.removeItem('blogUser');
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='light'
      variant='light'
      className='mb-4 shadow-sm border-bottom'
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          className='fw-bold text-primary'
          style={{ fontSize: '1.4rem' }}
        >
          Blog App
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/' className='text-primary fw-semibold'>
              Blogs
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/users'
              className='text-primary fw-semibold'
            >
              Users
            </Nav.Link>
          </Nav>

          <Nav className='align-items-center'>
            <Navbar.Text className='me-3 text-secondary'>
              Signed in as <strong>{username}</strong>
            </Navbar.Text>
            <Button variant='outline-primary' size='sm' onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
