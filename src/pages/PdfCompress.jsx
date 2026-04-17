import React, { useState } from 'react'
import axios from 'axios'
import { CgCompressV } from 'react-icons/cg'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#f97316'

function PdfCompress() {
  const [files, setFiles] = useState([])
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
      formData.append('file', files[0])
      const response = await axios.post(`${API_ENDPOINT}/pdfcompressed`, formData, { responseType: 'blob' })
      setDownloadName(`${files[0].name.split('.')[0]}_compressed.pdf`)
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="PDF Compressor"
      subtitle="Shrink your PDF file size without losing content quality. Great for email attachments."
      accent={ACCENT}
      accentBg="#fff7ed"
      icon={<CgCompressV />}
    >
      <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
      <div style={{ marginTop: 16 }}>
        <ActionButton onClick={handleCompress} loading={loading} loadingText="Compressing..." accent={ACCENT}>
          Compress PDF
        </ActionButton>
        <ErrorAlert message={error} />
      </div>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default PdfCompress
