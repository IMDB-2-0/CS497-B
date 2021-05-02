import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { Button } from 'antd';

import { logoutUser } from '../redux/actions/authActions';

function CustomNavbar({ auth, logoutUser }) {
    const logout = () => logoutUser();
    const route = window.location.pathname.substr(1);
  
    const { isAuthenticated } = auth;
  
    const loggedInNav = (route) => (
      <>
        <Nav.Link href="/" active={route === ''}>
          Home
        </Nav.Link>
        <Nav.Link href="/liked" active={route === 'liked'}>
          Favorites
        </Nav.Link>
        <Nav.Link href="/disliked" active={route === 'disliked'}>
          Disliked
        </Nav.Link>
        <Nav.Link href="/searchMovie" active={route === 'searchMovie'}>
          Search Movie
        </Nav.Link>
        <Nav.Link onClick={logout}>
          <Button shape="round">Log out</Button>
        </Nav.Link>{' '}
      </>
    );
  
    const loggedOutNav = (route) => (
      <>
        <Nav.Link href="/" active={route === 'login'}>
          Login
        </Nav.Link>
      </>
    );
  
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Movie.AI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="mr-right">
              {isAuthenticated ? loggedInNav(route) : loggedOutNav(route)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  CustomNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { logoutUser })(CustomNavbar);