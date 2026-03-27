import React from 'react'
import { Button,Row, Col, Card } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'
import { useNavigate } from 'react-router-dom';

import heroImg from '../assets/icons/hero_icon.png'

import '../styles/home.css'

function Home() {

  const navigate = useNavigate();

  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden', backgroundColor:'#F4F6F8'}}>
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
          <Row className="align-items-center justify-content-center" style={{ minHeight: '200px'}}>

            <Col md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
              <div>
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
                
              </div>
            </Col>

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
                    <Button className='tool-style' onClick={() =>{
                      navigate('image-conversion')
                    }} variant='light' >Image Converter</Button>

                    <Button onClick={() =>{
                      navigate('image-resize')
                    }} className='tool-style' variant='light'>Image Resizer</Button>
                    
                    {/* <Button onClick={() =>{
                      navigate('image-compress')
                    }} className='tool-style' variant='light'>Image Compressor</Button>
                    <Button onClick={() =>{
                      navigate('image-watermark')
                    }} className='tool-style' variant='light'>Image Watermark</Button> */}
                  
                  </div>
                </Col>
                <Col>
                  <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                    <Button onClick={() =>{
                      navigate('image-pdf')
                    }} className='tool-style' variant='light'>Image to PDF</Button>
                    <Button className='tool-style' onClick={() =>{
                      navigate('/bg-remove')
                    }} variant='light'>Background Remover</Button>
                    
                  </div>
                </Col>
              </Row>
            </Col>

            <Col lg={3}>
              <span style={{fontWeight:'bold', fontSize:20}}>PDF Tools </span>
              <Row className="mt-2">
                <Col>
                  <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                    <Button onClick={() =>{
                      navigate('pdf-image')
                    }} className='tool-style' variant='light'>PDF to Images</Button>
                    {/* <Button onClick={() =>{
                      navigate('pdf-merge')
                    }} className='tool-style' variant='light'>PDF Merger</Button> */}
                    <Button onClick={() =>{
                      navigate('pdf-compress')
                    }} className='tool-style' variant='light'>PDF Compressor</Button>
                    
                  </div>
                </Col>
                
              </Row>
            </Col>

            <Col lg={3}>
              <span style={{fontWeight:'bold', fontSize:20}}>Office Tools </span>

              <Row className="mt-2">
                <Col>
                  <div style={{display:'flex', flexDirection:'column', gap: 10}}>
                    <Button className='tool-style' onClick={() =>{
                        navigate('doc-conversion',{
                          state: {
                            type:'DOCX'
                          }
                        })
                    }} variant='light'>Office documents to PDF</Button>

                      <Button onClick={() =>{
                        navigate('pdf-docx')
                      }} className='tool-style' variant='light'>PDF to DOCX</Button>
                    
                  </div>
                </Col>
                
              </Row>
            </Col>
          </Row>
            <br />
      </div>     
    </div>
  )
}

export default Home