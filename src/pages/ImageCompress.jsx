import React, {useState} from 'react'

import {Row, Col, Card, Button, Form } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';

function ImageCompress() {

  const [sliderValue, setSliderValue] = useState(80)
  const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden', backgroundColor:'#F4F6F8'}}>
       
       <div>
            <NavbarComponent />
        </div>

        <div className='container' style={{width: '100%',  padding:20}}>
          <div>
            <h2 style={{fontWeight:'bold'}}>Image Compress</h2>
            <span>Compress your images into smaller size <br />
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
                    <Form.Label>Select compression percent: <span style={{fontWeight:'bold'}}>{sliderValue}</span></Form.Label>
                    <Form.Range min={0} max={100} step={10} value={sliderValue} onChange={handleSliderChange} />            
                  <br />
                  <Button 
                    disabled={sliderValue==0} 
                    variant={sliderValue == 0 ? 'secondary': 'primary'}>Compress Image</Button>
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

export default ImageCompress