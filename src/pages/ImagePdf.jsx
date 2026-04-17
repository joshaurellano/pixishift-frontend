import React, { useState } from 'react'
import axios from 'axios'
import { GrDocumentPdf } from 'react-icons/gr'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#3b82f6'

function ImagePdf() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }

  const handleConvert = async () => {
    if (files.length === 0) { setError('Please select at least one file.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      const response = await axios.post(`${API_ENDPOINT}/img2pdf`, formData, { responseType: 'blob' })
      setDownloadName(files.length === 1 ? `${files[0].name.split('.')[0]}.pdf` : 'pixishift_images.pdf')
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="Image to PDF"
      subtitle="Bundle one or multiple images into a single PDF file. Images are added in the order you upload them."
      accent={ACCENT}
      accentBg="#eff6ff"
      icon={<GrDocumentPdf />}
      badges={['Multi-image support']}
    >
      <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
      <div style={{ marginTop: 16 }}>
        <ActionButton onClick={handleConvert} loading={loading} loadingText="Converting..." accent={ACCENT}>
          Convert to PDF
        </ActionButton>
        <ErrorAlert message={error} />
      </div>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default ImagePdf
