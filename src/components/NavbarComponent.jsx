import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/icons/pixishift_logo.svg'

function NavbarComponent() {
  const navigate = useNavigate()

  return (
    <Navbar style={{ backgroundColor: 'white', height: '60px', borderBottom: '1px solid #e9ecef' }}>
      <Container fluid>

        <Navbar.Brand href='/' style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt='PixiShift Logo' height={130} />
        </Navbar.Brand>

        <Nav style={{ gap: 4, alignItems: 'center' }}>

          <Nav.Item>
            <Nav.Link
              onClick={() => navigate('/contact-us')}
              style={{
                fontSize: 16,
                fontWeight:'bold',
                color: '#6b7280',
                borderRadius: 8,
                padding: '6px 12px',
              }}
            >
              Got Suggestions? Contact Us
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              onClick={() => navigate('/support')}
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#fff',
                backgroundColor: '#1a3de4',
                borderRadius: 8,
                padding: '6px 14px',
              }}
            >
              Support Us
            </Nav.Link>
          </Nav.Item>

        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
