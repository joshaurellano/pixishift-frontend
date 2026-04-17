import React from 'react'
import { Spinner } from 'react-bootstrap'

function ActionButton({ onClick, loading, loadingText, children, accent = '#1a3de4', disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        width: '100%',
        backgroundColor: loading || disabled ? '#93aff5' : accent,
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '12px 28px',
        fontSize: 14.5,
        fontWeight: 700,
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'all 0.18s ease',
        boxShadow: loading || disabled ? 'none' : `0 4px 14px ${accent}33`,
        letterSpacing: '-0.01em',
      }}
      onMouseEnter={e => { if (!loading && !disabled) e.currentTarget.style.boxShadow = `0 6px 20px ${accent}44` }}
      onMouseLeave={e => { if (!loading && !disabled) e.currentTarget.style.boxShadow = `0 4px 14px ${accent}33` }}
    >
      {loading ? (
        <>
          <Spinner animation="border" size="sm" />
          {loadingText || 'Processing...'}
        </>
      ) : children}
    </button>
  )
}

export default ActionButton
