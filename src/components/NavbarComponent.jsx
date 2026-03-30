import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/icons/pixishift_Logo.svg'

function NavbarComponent() {
  return (
    <Navbar style={{backgroundColor:'white', height:'60px'}}>
        <Container fluid>
        <Navbar.Brand href='/' style={{fontWeight:'bold'}}>
            <img src={logo} 
                alt='PixiShift Logo' 
                height={130}/>

        </Navbar.Brand>
        </Container>

    </Navbar>
  )
}

export default NavbarComponent
