import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/icons/pixishift_logo.png'

function NavbarComponent() {
  return (
    <Navbar style={{backgroundColor:'white', height:'60px'}}>
        <Container fluid>
        <Navbar.Brand href='/' style={{fontWeight:'bold'}}>
            <img src={logo} 
                alt='PixiShift Logo' 
                height={80}/>

        </Navbar.Brand>

        <Nav className="ms-auto" style={{fontWeight:'bold'}}>
            <Nav.Link>Tools</Nav.Link>
            <Nav.Link>How it Works</Nav.Link>
            <Nav.Link>About</Nav.Link>
        </Nav>
        </Container>

    </Navbar>
  )
}

export default NavbarComponent
