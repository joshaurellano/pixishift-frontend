import React, { useState } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, Spinner } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import DownloadResultsComponent from '../components/DownloadResultsComponent'

import { API_ENDPOINT } from '../../Api'

import '../styles/uploadCol.css'

function ImagePdf() {
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
      files.forEach(file => formData.append('files', file))

      const response = await axios.post(
        `${API_ENDPOINT}/img2pdf`,
        formData,
        { responseType: 'blob' }
      )

      const baseName = files[0].name.split('.')[0]
      setDownloadName(files.length === 1 ? `${baseName}.pdf` : 'pixishift_images.pdf')

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
          <h2 style={{ fontWeight: 'bold' }}>Image to PDF</h2>
          <span>Convert one or multiple images into a single PDF file</span>
        </div>

        <br />
        <div>
          <Card className='uploadCol'>
            <Row style={{ padding: '5px', height: '100%', width: '100%' }}>
              <Col style={{ width: '100%' }}>
                <UploadCardComponent onFileChange={handleFileChange} />
                <br />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={handleConvert}
                    disabled={loading}
                    style={{ backgroundColor: '#1a3de4', border: 'none' }}
                  >
                    {loading
                      ? <><Spinner animation='border' size='sm' /> Converting...</>
                      : 'Convert to PDF'
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

export default ImagePdf
