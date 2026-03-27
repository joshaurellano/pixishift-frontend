import React, { useState }  from 'react'
import axios from 'axios'
import {Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';

import { API_ENDPOINT } from '../../Api'

function ImageResize() {
  const [files, setFiles] = useState([])
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('px')
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => {
    setFiles(selectedFiles)
    setDownloadUrl(null)
    setError(null)
  }

  const handleResize = async () => {
    if (files.length === 0) {
      setError('Please select at least one file.')
      return
    }

    setLoading(true)
    setError(null)
    setDownloadUrl(null)

    try {
      const formData = new FormData()
      let response

      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(
          `${API_ENDPOINT}/image-resize?img_width=${width}&img_height=${height}&unit=${unit}`,
          formData,
          { responseType: 'blob' }
        )
        const baseName = files[0].name.split('.')[0]
        const ext = files[0].name.split('.').pop()

        setDownloadName(`${baseName}_resized.${ext}`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(
          `${API_ENDPOINT}/batch-resize?img_width=${width}&img_height=${height}&unit=${unit}`,
          formData,
          { responseType: 'blob' }
        )
        setDownloadName('pixishift_resized.zip')
      }

      const blob = new Blob([response.data])
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

    } catch {
        setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
            minHeight: '320px',
            boxShadow: '5px 5px #888888'
          }}> 
            <Row style={{padding:'5px', height:'100%'}}>

              <Col lg={9}>
                <UploadCardComponent onFileChange={handleFileChange} />        
                </Col>

                <Col lg={3}>
                  <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <div style={{width:'100%', display:'flex', justifyContent:'start'}}>
                      <Form.Label style={{fontWeight:'bold'}}>Select Unit</Form.Label>
                    </div>
                    <Form.Select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      <option value='px'>Pixels (px)</option>
                      <option value='in'>Inches (in)</option>
                      <option value='cm'>Centimeters (cm)</option>
                      <option value='mm'>Millimeters (mm)</option>
                    </Form.Select>

                    <br />

                    <div style={{width:'100%', display:'flex', justifyContent:'start'}}>
                      <Form.Label style={{fontWeight:'bold'}}>Width: </Form.Label>
                    </div>
                    <Form.Control value={width} onChange={(e) => setWidth(e.target.value)} type='number' />
                  <br />
                  <div style={{width:'100%', display:'flex', justifyContent:'start'}}>
                      <Form.Label style={{fontWeight:'bold'}}>Height: </Form.Label>
                    </div>
                    <Form.Control value={height} onChange={(e) => setHeight(e.target.value)} type='number' />
                  <br />
                  <div style={{width:'100%', display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    <Button
                      onClick={handleResize}
                      disabled={loading}
                      style={{ backgroundColor: '#1a3de4', border: 'none' }}
                    >
                      {loading
                        ? <><Spinner animation='border' size='sm' /> Resizing...</>
                        : 'Resize Image'
                      }
                    </Button>

                    {error && (
                    <span style={{ color: 'red', fontSize: 12, marginTop: 8 }}>
                      {error}
                    </span>
                  )}
                  </div>
                </div> 
              </Col>
            </Row>

          </Card>

          </div>
            <br />
          <div>
            <DownloadResultsComponent 
              downloadUrl={downloadUrl}
              downloadName={downloadName} />
          </div>
          
        </div>
    </div>
  )
}

export default ImageResize