import React, { useState } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, Spinner } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import DownloadResultsComponent from '../components/DownloadResultsComponent'

import { API_ENDPOINT } from '../../Api'

function ImageWatermark() {
  const [files, setFiles] = useState([])
  const [watermarkFile, setWatermarkFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => {
    setFiles(selectedFiles)
    setDownloadUrl(null)
    setError(null)
  }

  const handleWatermarkChange = (e) => {
    setWatermarkFile(e.target.files[0])
    setDownloadUrl(null)
    setError(null)
  }

  const handleWatermark = async () => {
    if (files.length === 0) {
      setError('Please select at least one image.')
      return
    }

    if (!watermarkFile) {
      setError('Please select a watermark image.')
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
        formData.append('watermark_img', watermarkFile)
        response = await axios.post(
          `${API_ENDPOINT}/add-image-watermark`,
          formData,
          { responseType: 'blob' }
        )
        const baseName = files[0].name.split('.')[0]
        const ext = files[0].name.split('.').pop()
        setDownloadName(`${baseName}_watermarked.${ext}`)
      } else {
        files.forEach(file => formData.append('files', file))
        formData.append('watermark_img', watermarkFile)
        response = await axios.post(
          `${API_ENDPOINT}/batch-watermark`,
          formData,
          { responseType: 'blob' }
        )
        setDownloadName('pixishift_watermarked.zip')
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
          <h2 style={{ fontWeight: 'bold' }}>Image Watermark</h2>
          <span>Add a watermark image to your photos</span>
        </div>

        <br />
        <div>
          <Card style={{
            padding: '40px',
            width: '100%',
            borderRadius: '20px',
            border: 'none',
            minHeight: '320px',
            boxShadow: '5px 5px #888888'
          }}>
            <Row style={{ padding: '5px', height: '100%' }}>
              <Col lg={9}>
                <UploadCardComponent onFileChange={handleFileChange} />
              </Col>

              <Col lg={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold' }}>Watermark Image</span>
                  <span style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>
                    Select the image to use as watermark
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleWatermarkChange}
                    style={{ fontSize: 13 }}
                  />
                  <br />
                  <Button
                    onClick={handleWatermark}
                    disabled={loading}
                    style={{ backgroundColor: '#1a3de4', border: 'none' }}
                  >
                    {loading
                      ? <><Spinner animation='border' size='sm' /> Adding Watermark...</>
                      : 'Add Watermark'
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

export default ImageWatermark
