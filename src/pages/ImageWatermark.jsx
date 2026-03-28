import React, { useState } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, Spinner } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import DownloadResultsComponent from '../components/DownloadResultsComponent'

import { API_ENDPOINT } from '../../Api'

import '../styles/uploadCol.css'

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
          <Card className='uploadCol'>
            <Row style={{ padding: '5px', height: '100%' }}>
              <Col lg={9}>
                <UploadCardComponent onFileChange={handleFileChange} />
              </Col>

              <Col lg={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
      
                  <span style={{ fontWeight: 600, fontSize: 13.5, color: '#111827' }}>Watermark Image</span>
                </div>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 8, lineHeight: 1.4 }}>
                  Choose a PNG or image to overlay as a watermark
                </p>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1.5px dashed #D1D5DB',
                  borderRadius: 8,
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: watermarkFile ? '#EEF2FF' : '#FAFAFA',
                  transition: 'all 0.2s',
                  fontSize: 12.5,
                  color: watermarkFile ? '#1a3de4' : '#6B7280',
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
                    {watermarkFile ? watermarkFile.name : 'Click to select watermark'}
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleWatermarkChange}
                    style={{ display: 'none' }}
                  />
                </label>
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
