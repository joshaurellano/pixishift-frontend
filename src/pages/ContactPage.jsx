import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

const CONTACT_EMAIL = 'joshuaofficialbusiness1@gmail.com'
const ACCENT = '#1a3de4'

function ContactPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#f4f6fb', fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}>
      <NavbarComponent />

      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e9ecef', padding: '20px 24px' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <button
            onClick={() => window.history.back()}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, color: '#6b7280', fontWeight: 500, marginBottom: 14,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = ACCENT}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: '#eff6ff', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 22,
            }}>💬</div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
                Contact Us
              </h1>
              <p style={{ fontSize: 13.5, color: '#6b7280', margin: 0 }}>
                Got suggestions, feedback, or questions? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: 700, padding: '32px 24px 60px' }}>
        <Row className="g-4">
          {/* Email card */}
          <Col md={12}>
            <div style={{
              backgroundColor: '#fff', borderRadius: 16,
              border: '1.5px solid #e9ecef',
              padding: '28px 28px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  backgroundColor: '#eff6ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>✉️</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                    Email us directly
                  </h3>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
                    For suggestions, bug reports, or business inquiries — we typically respond within a day.
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    backgroundColor: '#f8fafc', borderRadius: 10,
                    border: '1.5px solid #e9ecef',
                    padding: '12px 16px',
                    flexWrap: 'wrap',
                  }}>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      style={{ color: ACCENT, fontWeight: 600, fontSize: 14, textDecoration: 'none', flex: 1 }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <button
                      onClick={handleCopy}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        backgroundColor: copied ? '#ecfdf5' : ACCENT,
                        color: copied ? '#065f46' : '#fff',
                        border: `1.5px solid ${copied ? '#bbf7d0' : ACCENT}`,
                        borderRadius: 8, padding: '7px 14px',
                        fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.2s', flexShrink: 0,
                      }}
                    >
                      {copied ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Info cards */}
          <Col md={6}>
            <div style={{
              backgroundColor: '#fff', borderRadius: 16,
              border: '1.5px solid #e9ecef', padding: '22px 22px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: '100%',
            }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>💡</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>Feature Requests</h3>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                Have an idea for a new tool or improvement? We genuinely read all suggestions.
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div style={{
              backgroundColor: '#fff', borderRadius: 16,
              border: '1.5px solid #e9ecef', padding: '22px 22px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: '100%',
            }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>🐛</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>Bug Reports</h3>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                Something not working? Let us know which tool, what file type, and what went wrong.
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <FooterComponent />
    </div>
  )
}

export default ContactPage
