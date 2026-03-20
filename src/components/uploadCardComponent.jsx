import React from 'react'
import { Card, Form } from 'react-bootstrap'
import { TiUpload } from "react-icons/ti";

function UploadCardComponent() {
  return (
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
  )
}

export default UploadCardComponent