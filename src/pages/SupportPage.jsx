import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

import gcashLogo from '../assets/icons/gcash-logo.png'
import mayaLogo from '../assets/icons/maya-logo.png'

const GCASH_NUMBER = import.meta.env.VITE_GCASH_NUMBER
const MAYA_NUMBER = import.meta.env.VITE_MAYA_NUMBER
const ACCENT = '#1a3de4'

function PaymentCard({ logo, logoAlt, logoHeight = 24, title, description, number, accentColor, accentBg }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: 16,
      border: '1.5px solid #e9ecef',
      padding: '24px 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      height: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <img src={logo} alt={logoAlt} style={{ height: logoHeight, objectFit: 'contain' }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{title}</span>
      </div>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 14, lineHeight: 1.5 }}>
        {description}
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        backgroundColor: accentBg, borderRadius: 10,
        border: `1.5px solid ${accentColor}22`,
        padding: '11px 14px',
      }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', flex: 1, letterSpacing: '0.5px' }}>
          {number}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: copied ? '#ecfdf5' : accentColor,
            color: copied ? '#065f46' : '#fff',
            border: `1.5px solid ${copied ? '#bbf7d0' : accentColor}`,
            borderRadius: 8, padding: '7px 14px',
            fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s', flexShrink: 0,
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function SupportPage() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#f4f6fb', fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}>
      <NavbarComponent />

      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e9ecef', padding: '20px 24px' }}>
        <div className="container" style={{ maxWidth: 740 }}>
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
              background: '#fff7ed', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 22,
            }}>☕</div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
                Support Us
              </h1>
              <p style={{ fontSize: 13.5, color: '#6b7280', margin: 0 }}>
                PixiShift is free for everyone. If it's helped you, consider buying us a coffee!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: 740, padding: '32px 24px 60px' }}>

        {/* Ko-fi banner */}
        <div style={{
          background: 'linear-gradient(135deg, #fff7ed, #fef3c7)',
          border: '1.5px solid #fed7aa',
          borderRadius: 16, padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 20,
          marginBottom: 24, flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 22 }}>☕</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#92400e' }}>Ko-fi</span>
              <span style={{
                fontSize: 11, fontWeight: 700, backgroundColor: '#f97316',
                color: '#fff', borderRadius: 6, padding: '2px 7px',
              }}>International</span>
            </div>
            <p style={{ fontSize: 13, color: '#78350f', margin: 0, lineHeight: 1.5 }}>
              Support us from anywhere in the world via Ko-fi.
            </p>
          </div>
          <a href="https://ko-fi.com/I2I81X0TMG" target="_blank" rel="noreferrer">
            <img
              height="40"
              style={{ border: '0px', display: 'block' }}
              src="https://storage.ko-fi.com/cdn/kofi5.png?v=6"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
        </div>

        {/* PH payment methods */}
        <div style={{ marginBottom: 12 }}>
          <p style={{
            fontSize: 11.5, fontWeight: 700, color: '#9ca3af',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14,
          }}>
            🇵🇭 Philippine Payment Methods
          </p>
          <Row className="g-3">
            <Col md={6}>
              <PaymentCard
                logo={gcashLogo}
                logoAlt="GCash"
                logoHeight={22}
                title="GCash"
                description="Send your support via GCash. Tap 'Copy' then paste in the GCash app."
                number={GCASH_NUMBER}
                accentColor="#0070e0"
                accentBg="#eff6ff"
              />
            </Col>
            <Col md={6}>
              <PaymentCard
                logo={mayaLogo}
                logoAlt="Maya"
                logoHeight={22}
                title="Maya"
                description="Send your support via Maya. Tap 'Copy' then paste in the Maya app."
                number={MAYA_NUMBER}
                accentColor="#2d9b52"
                accentBg="#f0fdf4"
              />
            </Col>
          </Row>
        </div>

        {/* Thank you note */}
        <div style={{
          marginTop: 28, textAlign: 'center',
          padding: '20px 24px',
          backgroundColor: '#fff',
          borderRadius: 14, border: '1.5px solid #e9ecef',
        }}>
          <p style={{ fontSize: 14, color: '#374151', fontWeight: 600, margin: '0 0 4px' }}>
            🙏 Thank you for your support
          </p>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>
            Every contribution helps keep PixiShift free and running for everyone.
          </p>
        </div>
      </div>

      <FooterComponent />
    </div>
  )
}

export default SupportPage
