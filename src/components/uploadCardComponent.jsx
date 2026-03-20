import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { TiUpload } from "react-icons/ti";

function UploadCardComponent({ onFileChange }) {
  const [fileName, setFileName] = useState('Choose a file')

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    if (selected.length > 0) {
      setFileName(
        selected.length === 1
          ? selected[0].name
          : `${selected.length} files selected`
      )
      onFileChange(selected)
    } else {
      setFileName('Choose a file')
      onFileChange([])
    }
  }

  return (
    <Card style={{
      height: '100%',
      width: '100%',
      borderStyle: 'dashed',
      borderWidth: '2px',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className='mt-2' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <TiUpload style={{ fontSize: 40 }} />
        <span>Drag and Drop files here</span>

        {/* Hidden real input */}
        <Form.Control
          type='file'
          id='fileInput'
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Custom styled label */}
        <label htmlFor='fileInput' style={{
          padding: '8px 16px',
          backgroundColor: '#1a3de4',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: 0
        }}>
          {fileName}
        </label>
      </div>
    </Card>
  )
}

export default UploadCardComponent