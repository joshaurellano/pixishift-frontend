import React, { useState } from 'react'
import axios from 'axios'
import { FaCodeMerge } from 'react-icons/fa6'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#f97316'

function PdfMerge() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }

  const handleMerge = async () => {
    if (files.length < 2) { setError('Please select at least two PDF files to merge.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      const response = await axios.post(`${API_ENDPOINT}/pdfmerge`, formData, { responseType: 'blob' })
      setDownloadName('pixishift_merged.pdf')
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="PDF Merger"
      subtitle="Combine multiple PDF files into one document. Files are merged in the order uploaded."
      accent={ACCENT}
      accentBg="#fff7ed"
      icon={<FaCodeMerge />}
      badges={['Requires 2+ PDFs']}
    >
      <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
      <div style={{ marginTop: 16 }}>
        <ActionButton onClick={handleMerge} loading={loading} loadingText="Merging..." accent={ACCENT}>
          Merge PDFs
        </ActionButton>
        <ErrorAlert message={error} />
      </div>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default PdfMerge
