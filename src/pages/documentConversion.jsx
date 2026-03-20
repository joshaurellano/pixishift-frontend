import React, {useState} from 'react'

import { Button,Row, Col, Card, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';

import { FaArrowRight } from "react-icons/fa";

function DocumentConversion() {
  const location = useLocation();
  const { type } = location.state || {};
  const [selectedFormat, setSelectedFormat] = useState(type);

  return (
    <div style={{minHeight:'100vh',  overflowX:'hidden', backgroundColor:'#F4F6F8'}}>
       
       <div>
            <NavbarComponent />
        </div>

        <div className='container' style={{width: '100%',  padding:20}}>
          <div>
            <h2 style={{fontWeight:'bold'}}>Document Converter</h2>
            <span>Easily convert your office documents to PDF <br />
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
                    <Form.Select value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      defaultValue={type} aria-label="Default select example">
                      <option value='DOCX'>DOCX</option>
                      <option value="XLSX">XLSX</option>
                      <option value="PPTX">PPTX</option>
                    </Form.Select>              
                  <br />
                  <span style={{fontWeight:'bold'}}>{selectedFormat} <FaArrowRight /> PDF </span>
                  <br />
                  <Button>Convert Document</Button>
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

export default DocumentConversion