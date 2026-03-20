import React, {useState} from 'react'

import { Button,Row, Col, Card, Form } from 'react-bootstrap'
import NavbarComponent from '../components/navbarComponent'
import { useLocation } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa";
import { TiUpload } from "react-icons/ti";

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
                <Card style={{
                  height: '100%',
                  width:'100%',
                  borderStyle:'dashed',
                  borderWidth:'2px',
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                  <div className='mt-2' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <TiUpload style={{fontSize:'40'}}/>
                    <span>Drag and Drop files here</span>
                    <Form.Control type='file' style={{width:'100px'}} />
                  </div>

                  </Card>              
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
            <span style={{fontWeight:'bold'}}>Download Results</span>
            <Card style={{height:'200px'}}>

            </Card>
          </div>
          
        </div>
    </div>
  )
}

export default DocumentConversion