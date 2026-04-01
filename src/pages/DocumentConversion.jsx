import React, { useState } from 'react'
import axios from 'axios';
import { Button, Row, Col, Card, Spinner } from 'react-bootstrap'

import FooterComponent from '../components/FooterComponent';
import NavbarComponent from '../components/NavbarComponent'
import UploadCardComponent from '../components/UploadCardComponent';
import DownloadResultsComponent from '../components/DownloadResultsComponent';

import { API_ENDPOINT } from '../../Api'

import '../styles/uploadCol.css'

const ALLOWED_EXTENSIONS = ['docx', 'xlsx', 'pptx']

function DocumentConversion() {
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

  const handleDocConversion = async () => {
    if (files.length === 0) {
      setError('Please select at least one file.')
      return
    }

    const allAllowed = files.every(file =>
      ALLOWED_EXTENSIONS.includes(file.name.split('.').pop().toLowerCase())
    )

    if (!allAllowed) {
      setError('Invalid file type. Only .docx, .xlsx, and .pptx are allowed.')
      return
    }

    setLoading(true)
    setError(null)
    setDownloadUrl(null)

    try {
      const formData = new FormData()
      let response

      const baseName = files[0].name.split('.')[0]
      const ext = files[0].name.split('.').pop().toLowerCase()

      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(
          `${API_ENDPOINT}/${ext}2pdf`,
          formData,
          { responseType: 'blob' }
        )
        setDownloadName(`${baseName}.pdf`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(
          `${API_ENDPOINT}/batch-docs2pdf`,
          formData,
          { responseType: 'blob' }
        )
        setDownloadName('pixishift_pdf.zip')
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
          <h2 style={{ fontWeight: 'bold' }}>Document Converter</h2>
          <span>Easily convert your office documents to PDF</span>
        </div>

        <br />

        <div>
          <Card className='uploadCol'>
            <Row style={{padding:'5px', height:'100%', width:'100%'}}>

              <Col style={{width:'100%'}}>
                  <UploadCardComponent onFileChange={handleFileChange} />
                <br />
                  <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button
                      onClick={handleDocConversion}
                      disabled={loading}
                      style={{ backgroundColor: '#1a3de4', border: 'none' }}
                    >
                      {loading
                        ? <><Spinner animation='border' size='sm' /> Converting...</>
                        : 'Convert Document'
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

      <div>
          <FooterComponent />
      </div>
    </div>
  )
}

export default DocumentConversion