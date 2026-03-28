import React, { useEffect, useState } from 'react'
import { TiDownload } from 'react-icons/ti'
import { IoMdDownload } from "react-icons/io";

function DownloadResultsComponent({ downloadUrl, downloadName }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
  if (downloadUrl) setTimeout(() => setVisible(true), 60)
  else setTimeout(() => setVisible(false), 0)
}, [downloadUrl])

  if (!downloadUrl) return null

  // const ext = downloadName?.split('.').pop().toUpperCase() || 'FILE'
  // const isZip = ext === 'ZIP'

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'all 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
    }}>
      <div style={{
        borderRadius: 16, border: '1.5px solid #bbf7d0',
        backgroundColor: '#f0fdf4',
        boxShadow: '0 2px 14px rgba(16,185,129,0.1)',
        overflow: 'hidden',
      }}>
        {/* Status bar */}
        <div style={{
          padding: '10px 18px',
          background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)',
          borderBottom: '1px solid #bbf7d0',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #34d399)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#fff', fontWeight: 700,
          }}>✓</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46' }}>
            Your file is ready to download
          </span>
        </div>

        {/* File row */}
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9.5, fontWeight: 800,
            letterSpacing: '0.03em',
          }}>
            <IoMdDownload style={{fontSize:'20'}} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13.5, fontWeight: 600, color: '#1f2937',
              margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {downloadName}
            </p>
            <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
              'Converted file — ready to save'
            </p>
          </div>

          <a href={downloadUrl} download={downloadName} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none', borderRadius: 10, padding: '10px 20px',
              fontSize: 13.5, fontWeight: 700, color: '#fff', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(16,185,129,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16,185,129,0.3)' }}
            >
              <TiDownload style={{ fontSize: 16 }} />
              Download
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DownloadResultsComponent
