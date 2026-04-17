import React from 'react'
import { Link } from 'react-router-dom'

function FooterComponent() {
  const linkStyle = {
    fontSize: 13, color: '#9ca3af', textDecoration: 'none',
    transition: 'color 0.15s', fontWeight: 500,
  }

  return (
    <div style={{
      borderTop: '1px solid #e9ecef',
      backgroundColor: '#fff',
      padding: '20px 28px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          PixiShift
        </span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: '#6b7280',
          backgroundColor: '#f1f5f9', borderRadius: 5, padding: '1px 6px',
        }}>
          free forever
        </span>
      </div>

      <span style={{ fontSize: 12.5, color: '#9ca3af' }}>
        © {new Date().getFullYear()} PixiShift. All rights reserved.
      </span>

      <div style={{ display: 'flex', gap: 20 }}>
        <a
          href="#"
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.color = '#1a3de4'}
          onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
        >
          Privacy
        </a>
        <a
          href="#"
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.color = '#1a3de4'}
          onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
        >
          Terms
        </a>
        <Link
          to="/contact-us"
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.color = '#1a3de4'}
          onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
        >
          Contact
        </Link>
      </div>
    </div>
  )
}

export default FooterComponent
