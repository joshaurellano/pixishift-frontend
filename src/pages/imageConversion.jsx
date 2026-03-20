import React from 'react'

import { Button,Row, Col, Card, Form } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import DownloadResultsComponent from '../components/DownloadResultsComponent';
import UploadCardComponent from '../components/UploadCardComponent';

function ImageConversion() {
  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden', backgroundColor:'#F4F6F8'}}>
       
       <div>
            <NavbarComponent />
        </div>

        <div className='container' style={{width: '100%',  padding:20}}>
          <div>
            <h2 style={{fontWeight:'bold'}}>Image Converter</h2>
            <span>Easily convert your images <br />
              Ideal for product photos and document submissions
            </span>
          </div>

          <br />          
          <div>
            <Card style={{
            padding: '40px',
            width: '100%',
            // background: 'linear-gradient(135deg, #1a3de4 0%, #0ab8a0 100%)',
            borderRadius: '20px',
            border: 'none',
            height: '320px',
            boxShadow: '5px 5px #888888'
          }}> 
            <Row style={{padding:'5px', height:'100%'}}>
              <Col lg={9}>
                <UploadCardComponent />             
                </Col>

                <Col lg={3}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{fontWeight:'bold'}}>Select Output Format</span>
                    <Form.Select aria-label="Default select example">
                      <option value='png'>PNG</option>
                      <option value="jpg">JPG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="webp">WEBP</option>
                      <option value="avif">AVIF</option>
                      <option value="bpm">BMP</option>
                      <option value="tiff">TIFF</option>
                    </Form.Select>              
                  <br />
                  <Button>Convert Image</Button>
                </div>
              </Col>
            </Row>

          </Card>

          </div>
            <br />
          <div>
            <DownloadResultsComponent />
          </div>
          
        </div>
    </div>
  )
}

export default ImageConversion