import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Form } from 'react-bootstrap'
import { GiResize } from 'react-icons/gi'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#3b82f6'
const UNITS = [
  { value: 'px', label: 'Pixels (px)' },
  { value: 'in', label: 'Inches (in)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'mm', label: 'Millimeters (mm)' },
]

function ImageResize() {
  const [files, setFiles] = useState([])
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('px')
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }

  const handleResize = async () => {
    if (files.length === 0) { setError('Please select at least one file.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      let response
      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(`${API_ENDPOINT}/image-resize?img_width=${width}&img_height=${height}&unit=${unit}`, formData, { responseType: 'blob' })
        const ext = files[0].name.split('.').pop()
        setDownloadName(`${files[0].name.split('.')[0]}_resized.${ext}`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(`${API_ENDPOINT}/batch-resize?img_width=${width}&img_height=${height}&unit=${unit}`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_resized.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  const inputStyle = {
    borderRadius: 8, border: '1.5px solid #e9ecef',
    padding: '9px 12px', fontSize: 14, width: '100%',
    outline: 'none', transition: 'border 0.15s',
  }

  return (
    <ToolPageLayout
      title="Image Resizer"
      subtitle="Resize images to exact dimensions in pixels, inches, centimeters, or millimeters."
      accent={ACCENT}
      accentBg="#eff6ff"
      icon={<GiResize />}
      badges={['Pixels', 'Inches', 'Centimeters', 'Millimeters']}
    >
      <Row className="g-4">
        <Col lg={7}>
          <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
        </Col>

        <Col lg={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block' }}>Unit</label>
              <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ ...inputStyle, padding: '9px 12px' }}>
                {UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
              </Form.Select>
            </div>

            <Row className="g-3">
              <Col>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block' }}>Width</label>
                <input
                  type="number" value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="e.g. 1920"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = '#e9ecef'}
                />
              </Col>
              <Col>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block' }}>Height</label>
                <input
                  type="number" value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 1080"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = '#e9ecef'}
                />
              </Col>
            </Row>

            <ActionButton onClick={handleResize} loading={loading} loadingText="Resizing..." accent={ACCENT}>
              Resize Image
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

export default ImageResize
