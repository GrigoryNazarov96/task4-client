import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import _ from 'lodash';

const NavBar = ({setUser, user}) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Task 4
        </Navbar.Brand>
        {user &&
          <Nav className="ms-auto" style={{ color: 'white' }}>
            <Button variant={'outline-light'} onClick={() => setUser()}>
              Log Out
            </Button> 
          </Nav>
        }
      </Container>
    </Navbar>
  );
};

export default NavBar;
