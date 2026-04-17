import React from 'react'

function ErrorAlert({ message }) {
  if (!message) return null

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      backgroundColor: '#fef2f2', border: '1.5px solid #fecaca',
      borderRadius: 10, padding: '10px 14px', marginTop: 12,
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: '#fff', fontWeight: 800, marginTop: 1,
      }}>!</div>
      <span style={{ fontSize: 13, color: '#991b1b', fontWeight: 500, lineHeight: 1.5 }}>
        {message}
      </span>
    </div>
  )
}

export default ErrorAlert
