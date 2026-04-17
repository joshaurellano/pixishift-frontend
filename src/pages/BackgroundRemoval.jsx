import React, { useState } from 'react'
import axios from 'axios'
import { SiRemovedotbg } from 'react-icons/si'

import ToolPageLayout from '../components/ToolPageLayout'
import DownloadResultsComponent from '../components/DownloadResultsComponent'
import UploadCardComponent from '../components/UploadCardComponent'
import ErrorAlert from '../components/ErrorAlert'
import ActionButton from '../components/ActionButton'

import { API_ENDPOINT } from '../../Api'

const ACCENT = '#3b82f6'

function BackgroundRemoval() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [downloadName, setDownloadName] = useState('')
  const [error, setError] = useState(null)

  const handleFileChange = (selectedFiles) => { setFiles(selectedFiles); setDownloadUrl(null); setError(null) }

  const handleBgRemove = async () => {
    if (files.length === 0) { setError('Please select at least one file.'); return }
    setLoading(true); setError(null); setDownloadUrl(null)
    try {
      const formData = new FormData()
      let response
      if (files.length === 1) {
        formData.append('file', files[0])
        response = await axios.post(`${API_ENDPOINT}/remove-bg`, formData, { responseType: 'blob' })
        setDownloadName(`${files[0].name.split('.')[0]}_bg-removed.png`)
      } else {
        files.forEach(file => formData.append('files', file))
        response = await axios.post(`${API_ENDPOINT}/batch-remove`, formData, { responseType: 'blob' })
        setDownloadName('pixishift_removed-bg.zip')
      }
      setDownloadUrl(URL.createObjectURL(new Blob([response.data])))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <ToolPageLayout
      title="Background Remover"
      subtitle="Automatically remove the background from your images. Output is a transparent PNG."
      accent={ACCENT}
      accentBg="#eff6ff"
      icon={<SiRemovedotbg />}
      badges={['PNG', 'JPEG', 'WEBP', 'BMP', 'TIFF']}
    >
      <UploadCardComponent onFileChange={handleFileChange} accent={ACCENT} />
      <div style={{ marginTop: 16 }}>
        <ActionButton onClick={handleBgRemove} loading={loading} loadingText="Removing Background..." accent={ACCENT}>
          Remove Background
        </ActionButton>
        <ErrorAlert message={error} />
      </div>

      <div style={{ marginTop: 24 }}>
        <DownloadResultsComponent downloadUrl={downloadUrl} downloadName={downloadName} />
      </div>
    </ToolPageLayout>
  )
}

export default BackgroundRemoval
