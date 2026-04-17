import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { SiConvertio } from 'react-icons/si'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const FORMATS = ['PNG', 'JPEG', 'JPG', 'WEBP', 'BMP', 'TIFF', 'AVIF']
const ACCENT = '#3b82f6'

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
    if (files.length === 0) { setError('Please select at least one file.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      let response
      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(`${API_ENDPOINT}/convert?out_img_format=${outputFormat}`, formData, { responseType: 'blob' })
        setDownloadName(`${files[0].name.split('.')[0]}.${outputFormat}`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(`${API_ENDPOINT}/batch-convert?out_img_format=${outputFormat}`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_converted.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="Image Converter"
      subtitle="Convert between JPG, PNG, WebP, AVIF, BMP, TIFF, and more."
      accent={ACCENT}
      accentBg="#eff6ff"
      icon={<SiConvertio />}
      badges={FORMATS}
    >
      <Row className="g-4">
        <Col lg={7}>
          <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
        </Col>

        <Col lg={5}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <span style={{ fontWeight: 700, fontSize: 13.5, color: '#374151', marginBottom: 10 }}>
              Select Output Format
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
              {FORMATS.map(fmt => (
                <div
                  key={fmt}
                  onClick={() => setOutputFormat(fmt.toLowerCase())}
                  style={{
                    borderRadius: 10,
                    border: `1.5px solid ${outputFormat === fmt.toLowerCase() ? ACCENT : '#e9ecef'}`,
                    height: 52,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: outputFormat === fmt.toLowerCase() ? '#eff6ff' : '#fff',
                    fontWeight: 700, fontSize: 12.5,
                    color: outputFormat === fmt.toLowerCase() ? ACCENT : '#6b7280',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {fmt}
                </div>
              ))}
            </div>

            <ActionButton onClick={handleConvert} loading={loading} loadingText="Converting..." accent={ACCENT}>
              Convert Image
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

export default ImageConversion
