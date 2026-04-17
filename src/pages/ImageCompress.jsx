import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Form } from 'react-bootstrap'
import { FaCompressArrowsAlt } from 'react-icons/fa'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#3b82f6'

function getQualityLabel(q) {
  if (q >= 85) return { label: 'High quality', color: '#10b981' }
  if (q >= 50) return { label: 'Balanced', color: '#f59e0b' }
  return { label: 'Smaller file', color: '#ef4444' }
}

function ImageCompress() {
  const [files, setFiles] = useState([])
  const [quality, setQuality] = useState(75)
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }

  const handleCompress = async () => {
    if (files.length === 0) { setError('Please select at least one file.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      let response
      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(`${API_ENDPOINT}/image-compress?quality=${quality}`, formData, { responseType: 'blob' })
        const ext = files[0].name.split('.').pop()
        setDownloadName(`${files[0].name.split('.')[0]}_compressed.${ext}`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(`${API_ENDPOINT}/batch-compress?quality=${quality}`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_compressed.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  const { label: qualityLabel, color: qualityColor } = getQualityLabel(quality)

  return (
    <ToolPageLayout
      title="Image Compressor"
      subtitle="Reduce file size while keeping your images looking great. Supports batch compression."
      accent={ACCENT}
      accentBg="#eff6ff"
      icon={<FaCompressArrowsAlt />}
    >
      <Row className="g-4">
        <Col lg={8}>
          <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
        </Col>

        <Col lg={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Quality</label>
                <span style={{ fontSize: 13, fontWeight: 700, color: qualityColor }}>
                  {quality}% — {qualityLabel}
                </span>
              </div>
              <Form.Range
                min={10} max={100} step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                style={{ accentColor: ACCENT }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Smaller file</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Best quality</span>
              </div>
            </div>

            <ActionButton onClick={handleCompress} loading={loading} loadingText="Compressing..." accent={ACCENT}>
              Compress Image
            </ActionButton>
            <ErrorAlert message={error} />
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default ImageCompress
