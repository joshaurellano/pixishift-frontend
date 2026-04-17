import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import FooterComponent from './FooterComponent'

function ToolPageLayout({ title, subtitle, accent = '#1a3de4', accentBg = '#eff6ff', icon, badges = [], children }) {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#f4f6fb', fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}>
      <NavbarComponent />

      {/* Page Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e9ecef', padding: '20px 24px 0' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, color: '#6b7280', fontWeight: 500, marginBottom: 14,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = accent}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All Tools
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingBottom: 20 }}>
            {icon && (
              <div style={{
                width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                background: accentBg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, marginTop: 2,
              }}>
                {icon}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
                {title}
              </h1>
              {subtitle && (
                <p style={{ fontSize: 13.5, color: '#6b7280', margin: '0 0 10px', lineHeight: 1.5 }}>
                  {subtitle}
                </p>
              )}
              {badges.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {badges.map(b => (
                    <span key={b} style={{
                      fontSize: 11, fontWeight: 600, color: accent,
                      backgroundColor: accentBg, borderRadius: 6,
                      padding: '2px 8px', letterSpacing: '0.02em',
                    }}>
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container" style={{ maxWidth: 900, padding: '28px 24px 48px' }}>
        {children}
      </div>

      <FooterComponent />
    </div>
  )
}

export default ToolPageLayout
