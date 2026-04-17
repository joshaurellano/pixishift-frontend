import React, { useState } from 'react'
import axios from 'axios'
import { SiLibreofficebase } from 'react-icons/si'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#10b981'
const ALLOWED_EXTENSIONS = ['docx', 'xlsx', 'pptx']

function DocumentConversion() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }

  const handleDocConversion = async () => {
    if (files.length === 0) { setError('Please select at least one file.'); return }
    const allAllowed = files.every(file => ALLOWED_EXTENSIONS.includes(file.name.split('.').pop().toLowerCase()))
    if (!allAllowed) { setError('Invalid file type. Only .docx, .xlsx, and .pptx are allowed.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      let response
      const baseName = files[0].name.split('.')[0]
      const ext = files[0].name.split('.').pop().toLowerCase()
      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(`${API_ENDPOINT}/${ext}2pdf`, formData, { responseType: 'blob' })
        setDownloadName(`${baseName}.pdf`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(`${API_ENDPOINT}/batch-docs2pdf`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_pdf.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="Office to PDF"
      subtitle="Convert Word, Excel, and PowerPoint files to PDF. Supports batch conversion."
      accent={ACCENT}
      accentBg="#ecfdf5"
      icon={<SiLibreofficebase />}
      badges={['Word .docx', 'Excel .xlsx', 'PowerPoint .pptx']}
    >
      <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
      <div style={{ marginTop: 16 }}>
        <ActionButton onClick={handleDocConversion} loading={loading} loadingText="Converting to PDF..." accent={ACCENT}>
          Convert Document to PDF
        </ActionButton>
        <ErrorAlert message={error} />
      </div>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default DocumentConversion
