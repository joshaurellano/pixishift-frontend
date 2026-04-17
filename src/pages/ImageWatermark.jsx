import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { MdBrandingWatermark } from 'react-icons/md'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#3b82f6'

function ImageWatermark() {
  const [files, setFiles] = useState([])
  const [watermarkFile, setWatermarkFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }
  const handleWatermarkChange = (e) => { setWatermarkFile(e.target.files[0]); setDownloadUrl(null); setError(null) }

  const handleWatermark = async () => {
    if (files.length === 0) { setError('Please select at least one image.'); return }
    if (!watermarkFile) { setError('Please select a watermark image.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      let response
      if (files.length === 1) {
        formData.append('file', files[0])
        formData.append('watermark_img', watermarkFile)
        response = await axios.post(`${API_ENDPOINT}/add-image-watermark`, formData, { responseType: 'blob' })
        const ext = files[0].name.split('.').pop()
        setDownloadName(`${files[0].name.split('.')[0]}_watermarked.${ext}`)
      } else {
        files.forEach(file => formData.append('files', file))
        formData.append('watermark_img', watermarkFile)
        response = await axios.post(`${API_ENDPOINT}/batch-watermark`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_watermarked.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="Image Watermark"
      subtitle="Overlay a custom watermark image onto your photos. Supports batch processing."
      accent={ACCENT}
      accentBg="#eff6ff"
      icon={<MdBrandingWatermark />}
    >
      <Row className="g-4">
        <Col lg={7}>
          <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
        </Col>

        <Col lg={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block' }}>
                Watermark Image
              </label>
              <p style={{ fontSize: 12.5, color: '#9ca3af', marginBottom: 8 }}>
                Choose a PNG or image to overlay as a watermark
              </p>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1.5px dashed ${watermarkFile ? ACCENT : '#d1d5db'}`,
                borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                backgroundColor: watermarkFile ? '#eff6ff' : '#fafafa',
                transition: 'all 0.2s', fontSize: 13,
                color: watermarkFile ? ACCENT : '#6b7280',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                  {watermarkFile ? watermarkFile.name : 'Click to select watermark'}
                </span>
                <input type="file" accept="image/*" onChange={handleWatermarkChange} style={{ display: 'none' }} />
              </label>
            </div>

            <ActionButton onClick={handleWatermark} loading={loading} loadingText="Adding Watermark..." accent={ACCENT}>
              Add Watermark
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

export default ImageWatermark
