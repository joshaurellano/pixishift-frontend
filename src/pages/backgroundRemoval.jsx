import React from 'react'

import { Button,Row, Col, Card } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';

function BackgroundRemoval() {

  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden', backgroundColor:'#F4F6F8'}}>
       
       <div>
            <NavbarComponent />
        </div>

        <div className='container' style={{width: '100%',  padding:20}}>
          <div>
            <h2 style={{fontWeight:'bold'}}>Background Removal</h2>
            <span>Easily remove background of your photos <br />
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
            minHeight: '320px',
            boxShadow: '5px 5px #888888'
          }}> 
            <Row style={{padding:'5px', height:'100%', width:'100%'}}>

              <Col lg={9} style={{width:'100%'}}>
                  <UploadCardComponent />
                <br /> 
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                  <Button>Remove Background</Button>
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

export default BackgroundRemoval