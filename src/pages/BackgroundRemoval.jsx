import React, { useState }  from 'react'
import axios from 'axios'

import { Button,Row, Col, Card, Spinner } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';
import { API_ENDPOINT } from '../../Api';

function BackgroundRemoval() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => {
    setFiles(selectedFiles)
    setDownloadUrl(null)
    setError(null)
  }

  const handleBgRemove = async () => {
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

      formData.append('file', files[0])
      response = await axios.post(
        `${API_ENDPOINT}/remove-bg`,
        formData,
        {responseType: 'blob'}
      )
      const baseName = files[0].name.split('.')[0]
      setDownloadName(`${baseName}_bg-removed.png`)

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

              <Col style={{width:'100%'}}>
                  <UploadCardComponent onFileChange={handleFileChange} />
                <br />
                  <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button
                      onClick={handleBgRemove}
                      disabled={loading}
                      style={{ backgroundColor: '#1a3de4', border: 'none' }}
                    >
                      {loading
                        ? <><Spinner animation='border' size='sm' /> Removing Background...</>
                        : 'Remove Background'
                      }
                    </Button>
                  </div>

                  {error && (
                    <span style={{ color: 'red', fontSize: 12, marginTop: 8 }}>
                      {error}
                    </span>
                  )}
                
              </Col>
             </Row>

          </Card>

          </div>
            <br />
          <div>
            <DownloadResultsComponent 
              downloadUrl={downloadUrl}
              downloadName={downloadName}
            />
          </div>
          
        </div>
    </div>
  )
}

export default BackgroundRemoval