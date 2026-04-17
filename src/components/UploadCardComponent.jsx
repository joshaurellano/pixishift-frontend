import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { TiUpload } from 'react-icons/ti'
import { CiCircleInfo } from 'react-icons/ci'
import { MdInsertDriveFile } from 'react-icons/md'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getExtColor(filename, accent) {
  const ext = filename.split('.').pop().toLowerCase()
  const map = {
    pdf: '#f97316', png: '#3b82f6', jpg: '#3b82f6', jpeg: '#3b82f6',
    webp: '#8b5cf6', docx: '#2563eb', xlsx: '#16a34a', pptx: '#dc2626',
    bmp: '#6b7280', tiff: '#0891b2', avif: '#7c3aed', zip: '#f59e0b',
  }
  return map[ext] || accent
}

function FileRow({ file, index, onRemove, accent }) {
  const color = getExtColor(file.name, accent)
  const ext = file.name.split('.').pop().toUpperCase()

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '9px 12px', borderRadius: 10,
      backgroundColor: '#fafafa', border: '1px solid #f1f5f9',
      animation: `rowIn 0.18s ease ${index * 0.04}s both`,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 8, flexShrink: 0,
        backgroundColor: `${color}12`,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9.5, fontWeight: 800, letterSpacing: '0.02em',
        color: color,
      }}>
        {ext}
      </div>
      <span style={{
        flex: 1, fontSize: 13, fontWeight: 500, color: '#1f2937',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {file.name}
      </span>
      <span style={{ fontSize: 11.5, color: '#9ca3af', flexShrink: 0, marginRight: 4 }}>
        {formatBytes(file.size)}
      </span>
      <button
        onClick={onRemove}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#cbd5e1', fontSize: 18, lineHeight: 1, padding: '0 2px',
          flexShrink: 0, transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
        onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
      >×</button>
    </div>
  )
}

function UploadCardComponent({ onFileChange, accent = '#1a3de4' }) {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const processFiles = (selected) => {
    if (!selected.length) return
    setFiles(selected)
    onFileChange(selected)
  }

  const handleFileChange = (e) => processFiles(Array.from(e.target.files))
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); processFiles(Array.from(e.dataTransfer.files)) }

  const removeFile = (i) => {
    const updated = files.filter((_, idx) => idx !== i)
    setFiles(updated)
    onFileChange(updated)
  }

  const clearAll = () => { setFiles([]); onFileChange([]) }

  return (
    <div>
      <style>{`
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('psFileInput').click()}
        style={{
          borderRadius: 12,
          border: `2px dashed ${isDragging ? accent : '#d1d5db'}`,
          backgroundColor: isDragging ? `${accent}08` : '#fafafa',
          padding: files.length > 0 ? '20px' : '40px 20px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 10,
          cursor: 'pointer', transition: 'all 0.18s ease',
        }}
      >
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          backgroundColor: isDragging ? `${accent}15` : '#f3f4f6',
          border: `1.5px solid ${isDragging ? `${accent}40` : '#e5e7eb'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.18s',
        }}>
          <TiUpload style={{ fontSize: 24, color: isDragging ? accent : '#9ca3af' }} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '0 0 4px' }}>
            {isDragging ? 'Drop to upload' : files.length > 0 ? 'Drop more or click to add' : 'Drag & drop files here'}
          </p>
          {files.length === 0 && (
            <p style={{ fontSize: 12.5, color: '#9ca3af', margin: 0 }}>or click anywhere to browse your device</p>
          )}
        </div>

        {files.length === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={e => e.stopPropagation()}>
            <label htmlFor="psFileInput" style={{
              padding: '9px 22px', borderRadius: 9, cursor: 'pointer',
              background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
              color: '#fff', fontSize: 13.5, fontWeight: 600, marginBottom: 0,
              boxShadow: `0 3px 10px ${accent}28`,
            }}>
              Choose files
            </label>
            <OverlayTrigger placement="right" overlay={<Tooltip>You can select multiple files at once</Tooltip>}>
              <span style={{ color: '#9ca3af', fontSize: 18, cursor: 'default' }}><CiCircleInfo /></span>
            </OverlayTrigger>
          </div>
        )}
      </div>

      <input
        type="file" id="psFileInput" multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* File List */}
      {files.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 2px' }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearAll}
              style={{ fontSize: 12, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >
              Clear all
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {files.map((file, i) => (
              <FileRow key={`${file.name}-${i}`} file={file} index={i} accent={accent} onRemove={() => removeFile(i)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadCardComponent
