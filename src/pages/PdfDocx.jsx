import React, { useState } from 'react'
import axios from 'axios'
import { FaFileWord } from 'react-icons/fa'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#10b981'

function PdfDocx() {
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
      let response
      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(`${API_ENDPOINT}/pdf2docx`, formData, { responseType: 'blob' })
        setDownloadName(`${files[0].name.split('.')[0]}.docx`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(`${API_ENDPOINT}/batch-pdf2docx`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_docx.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="PDF to DOCX"
      subtitle="Convert PDF files into editable Microsoft Word documents you can modify freely."
      accent={ACCENT}
      accentBg="#ecfdf5"
      icon={<FaFileWord />}
    >
      <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
      <div style={{ marginTop: 16 }}>
        <ActionButton onClick={handleConvert} loading={loading} loadingText="Converting..." accent={ACCENT}>
          Convert to DOCX
        </ActionButton>
        <ErrorAlert message={error} />
      </div>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default PdfDocx
