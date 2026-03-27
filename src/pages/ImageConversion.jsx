import React, { useState } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, Form, Spinner } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'

import { API_ENDPOINT } from '../../Api'

function ImageConversion() {
  const [files, setFiles] = useState([])
  const [outputFormat, setOutputFormat] = useState('png')
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => {
    setFiles(selectedFiles)
    setDownloadUrl(null)
    setError(null)
  }

  const handleConvert = async () => {
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
          `${API_ENDPOINT}/convert?out_img_format=${outputFormat}`,
          formData,
          { responseType: 'blob' }
        )
        const baseName = files[0].name.split('.')[0]
        setDownloadName(`${baseName}.${outputFormat}`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(
          `${API_ENDPOINT}/batch-convert?out_img_format=${outputFormat}`,
          formData,
          { responseType: 'blob' }
        )
        setDownloadName('pixishift_converted.zip')
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
          <h2 style={{ fontWeight: 'bold' }}>Image Converter</h2>
          <span>Easily convert your images <br />
            Ideal for product photos and document submissions
          </span>
        </div>

        <br />
        <div>
          <Card style={{
            padding: '40px',
            width: '100%',
            borderRadius: '20px',
            border: 'none',
            height: '320px',
            boxShadow: '5px 5px #888888'
          }}>
            <Row style={{ padding: '5px', height: '100%' }}>
              <Col lg={9}>
                <UploadCardComponent onFileChange={handleFileChange} />
              </Col>

              <Col lg={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold' }}>Select Output Format</span>
                  <Form.Select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                  >
                    <option value='png'>PNG</option>
                    <option value='jpg'>JPG</option>
                    <option value='jpeg'>JPEG</option>
                    <option value='webp'>WEBP</option>
                    <option value='avif'>AVIF</option>
                    <option value='bmp'>BMP</option>
                    <option value='tiff'>TIFF</option>
                  </Form.Select>
                  <br />
                  <Button
                    onClick={handleConvert}
                    disabled={loading}
                    style={{ backgroundColor: '#1a3de4', border: 'none' }}
                  >
                    {loading
                      ? <><Spinner animation='border' size='sm' /> Converting...</>
                      : 'Convert Image'
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
    </div>
  )
}

export default ImageConversion