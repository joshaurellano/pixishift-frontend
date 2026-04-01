import React from 'react'
import { Link } from 'react-router-dom'

function FooterComponent() {
  return (
    <div style={{
      borderTop: '1px solid #e9ecef', backgroundColor: '#fff',
      padding: '24px 32px',
      display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
        PixiShift
      </span>
      <span style={{ fontSize: 12.5, color: '#9ca3af' }}>
        © {new Date().getFullYear()} PixiShift. All rights reserved.
      </span>
      <div style={{ display: 'flex', gap: 20 }}>
        <a href="#" style={{ fontSize: 12.5, color: '#6b7280', textDecoration: 'none' }}>Privacy</a>
        <a href="#" style={{ fontSize: 12.5, color: '#6b7280', textDecoration: 'none' }}>Terms</a>
        <Link to="/contact-us" style={{ fontSize: 12.5, color: '#6b7280', textDecoration: 'none' }}>Contact</Link>
      </div>
    </div>
  )
}

export default FooterComponent
