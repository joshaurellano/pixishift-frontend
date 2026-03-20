import React from 'react'

import {Row, Col, Card, Button, Form } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';


function ImageResize() {
  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden', backgroundColor:'#F4F6F8'}}>
       
       <div>
            <NavbarComponent />
        </div>

        <div className='container' style={{width: '100%',  padding:20}}>
          <div>
            <h2 style={{fontWeight:'bold'}}>Image Resizer</h2>
            <span>Easily resize make your images bigger or smaller<br />
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
                  <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <div style={{width:'100%', display:'flex', justifyContent:'start'}}>
                      <Form.Label style={{fontWeight:'bold'}}>Select Unit</Form.Label>
                    </div>
                    <Form.Select>
                      <option value='px'>Pixels (px)</option>
                      <option value='in'>Inches (in)</option>
                      <option value='cm'>Centimeters (cm)</option>
                      <option value='mm'>Millimeters (mm)</option>
                    </Form.Select>

                    <br />

                    <div style={{width:'100%', display:'flex', justifyContent:'start'}}>
                      <Form.Label style={{fontWeight:'bold'}}>Enter Size: </Form.Label>
                    </div>
                    <Form.Control type='number' value={0} />
                  <br />
                  <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button className='w-100'>Resize Image</Button>
                  </div>
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

export default ImageResize