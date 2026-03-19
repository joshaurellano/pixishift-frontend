import React from 'react'
import { Button,Row, Col, Navbar, Container, Nav, Card } from 'react-bootstrap'
import NavbarComponent from '../components/navbarComponent'

import heroImg from '../assets/icons/hero_icon.png'

function Home() {
  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden'}}>
        <div>
            <NavbarComponent />
        </div>

        <div style={{width: '100%',  padding:20}}>
          <Card style={{
          padding: '40px',
          width: '100%',
          background: 'linear-gradient(135deg, #1a3de4 0%, #0ab8a0 100%)',
          borderRadius: '20px',
          border: 'none',
          minHeight: '280px'
        }}>
          <Row className="align-items-center" style={{ minHeight: '200px' }}>

            {/* Left: Text + CTA */}
            <Col md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '2.2rem',
                lineHeight: 1.2,
                marginBottom: '20px'
              }}>
                Shift your files,<br />
                simplify your workflow
              </h1>
              <div>
                <Button
                  variant='light'
                  style={{ fontWeight: '600', padding: '10px 24px', borderRadius: '8px' }}
                >
                  Get Started - It's Free!
                </Button>
              </div>
            </Col>

            {/* Right: Hero image */}
            <Col md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={heroImg}
                alt='hero icon'
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </Col>

          </Row>
        </Card>
        </div>

        <div className='container' style={{
          padding:20,
          display:'flex',
          flexDirection:'column',
          justifyContent:'start'
        }}>
          <Row>
            <Col lg={6}>
              <span style={{fontWeight:'bold', fontSize:20}}>Image Tools </span>
              <Row className="mt-2">
                <Col>
                  <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                    <Button variant='light' style={{width:200, height:100, boxShadow:'5px 10px #888888'}}>Image Converter</Button>
                    <Button variant='light' style={{width:200, height:100, boxShadow:'5px 10px #888888'}}>Image Compressor</Button>
                  </div>
                </Col>
                <Col>
                  <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                    <Button variant='light' style={{width:200, height:100, boxShadow:'5px 10px #888888'}}>Background Remover</Button>
                    <Button variant='light' style={{width:200, height:100, boxShadow:'5px 10px #888888'}}>Image Resizer</Button>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col lg={3}>
              <span style={{fontWeight:'bold', fontSize:20}}>PDF Tools </span>
              <Row className="mt-2">
                <Col>
                  <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                    <Button variant='light' style={{width:200, height:100, boxShadow:'5px 10px #888888'}}>PDF to Images</Button>
                    <Button variant='light' style={{width:200, height:100, boxShadow:'5px 10px #888888'}}>PDF Merger</Button>
                  </div>
                </Col>
                
              </Row>
            </Col>

            <Col lg={3}>
              <span style={{fontWeight:'bold', fontSize:20}}>Document Tools </span>
            </Col>
          </Row>
        </div>
        
    </div>
  )
}

export default Home