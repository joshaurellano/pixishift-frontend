import React, { useState } from 'react'
import { Card, Form , OverlayTrigger, Tooltip } from 'react-bootstrap'
import { TiUpload } from "react-icons/ti";
import { CiCircleInfo } from "react-icons/ci";

function UploadCardComponent({ onFileChange }) {
  const [fileName, setFileName] = useState('Choose a file')
  const [isDragging, setIsDragging] = useState(false)

    const processFiles = (selected) => {
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

    // Drag handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    processFiles(dropped)
  }

  return (
    <Card
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}

     style={{     
        height: '100%',
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: '2px',
        borderColor: isDragging ? '#1a3de4' : '#dee2e6',
        backgroundColor: isDragging ? '#eef1fd' : 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <div className='mt-2' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <TiUpload style={{ fontSize: 40, color: isDragging ? '#1a3de4' : 'inherit' }} />
        <span>{isDragging ? 'Release to upload' : 'Drag and Drop files here'}</span>

        {/* Hidden real input */}
        <Form.Control
          type='file'
          id='fileInput'
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Custom styled label */}
        <div style={{display: 'flex', alignItems:'center', justifyContent:'center' , width:'100%', gap:6}}>
          <div style={{display:'flex', gap: 6, alignItems:'center'}}>
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
            
            <OverlayTrigger
              key='right'
              placement='right'
              overlay={
                <Tooltip id={`tooltip-right`}>
                  Click the button once again to process another file/s
                </Tooltip>
              }
              >
              <CiCircleInfo />
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default UploadCardComponent