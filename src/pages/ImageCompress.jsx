import React, { useState } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, Form, Spinner } from 'react-bootstrap'

import FooterComponent from '../components/FooterComponent';
import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import DownloadResultsComponent from '../components/DownloadResultsComponent'

import { API_ENDPOINT } from '../../Api'

import '../styles/uploadCol.css'

function ImageCompress() {
  const [files, setFiles] = useState([])
  const [quality, setQuality] = useState(50)
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => {
    setFiles(selectedFiles)
    setDownloadUrl(null)
    setError(null)
  }

  const handleCompress = async () => {
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
          `${API_ENDPOINT}/image-compress?quality=${quality}`,
          formData,
          { responseType: 'blob' }
        )
        const baseName = files[0].name.split('.')[0]
        const ext = files[0].name.split('.').pop()
        setDownloadName(`${baseName}_compressed.${ext}`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(
          `${API_ENDPOINT}/batch-compress?quality=${quality}`,
          formData,
          { responseType: 'blob' }
        )
        setDownloadName('pixishift_compressed.zip')
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
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#F4F6F8' }}>

      <div>
        <NavbarComponent />
      </div>

      <div className='container' style={{ width: '100%', padding: 20 }}>
        <div>
          <h2 style={{ fontWeight: 'bold' }}>Image Compressor</h2>
          <span>Reduce your image file size while keeping it looking great</span>
        </div>

        <br />
        <div>
          <Card className='uploadCol'>
            <Row style={{ padding: '5px', height: '100%' }}>
              <Col lg={9}>
                <UploadCardComponent onFileChange={handleFileChange} />
              </Col>

              <Col lg={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold' }}>Quality: {quality}%</span>
                  <Form.Range
                    min={10}
                    max={100}
                    step={5}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                  />
                  <br />
                  <Button
                    onClick={handleCompress}
                    disabled={loading}
                    style={{ backgroundColor: '#1a3de4', border: 'none' }}
                  >
                    {loading
                      ? <><Spinner animation='border' size='sm' /> Compressing...</>
                      : 'Compress Image'
                    }
                  </Button>

                  {error && (
                    <span style={{ color: 'red', fontSize: 12, marginTop: 8 }}>
                      {error}
                    </span>
                  )}
                </div>
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

      <div>
          <FooterComponent />
        </div>
    </div>
  )
}

export default ImageCompress
