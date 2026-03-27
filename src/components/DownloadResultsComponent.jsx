import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { TiDownload } from "react-icons/ti";

function DownloadResultsComponent({ downloadUrl, downloadName }) {
  if (!downloadUrl) return null

  return (
    <Card style={{
      padding: '30px',
      width: '100%',
      borderRadius: '20px',
      border: 'none',
      boxShadow: '5px 5px #888888',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <TiDownload style={{ fontSize: 40, color: '#1a3de4' }} />
        <span style={{ fontWeight: 'bold' }}>Your file is ready!</span>
        <span style={{ fontSize: 12, color: '#888' }}>{downloadName}</span>
        <a href={downloadUrl} download={downloadName}>
          <Button style={{ backgroundColor: '#1a3de4', border: 'none' }}>
            Download
          </Button>
        </a>
      </div>
    </Card>
  )
}

export default DownloadResultsComponent
