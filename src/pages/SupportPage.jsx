import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import FooterComponent from '../components/FooterComponent'
import NavbarComponent from '../components/NavbarComponent'

import gcashLogo from '../assets/icons/gcash-logo.png'
import mayaLogo from '../assets/icons/maya-logo.png'

const GCASH_NUMBER = import.meta.env.VITE_GCASH_NUMBER
const MAYA_NUMBER = import.meta.env.VITE_MAYA_NUMBER

function SupportPage() {
  const [copiedGcash, setCopiedGcash] = useState(false)
  const [copiedMaya, setCopiedMaya] = useState(false)

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'gcash') {
      setCopiedGcash(true)
      setTimeout(() => setCopiedGcash(false), 2000)
    } else {
      setCopiedMaya(true)
      setTimeout(() => setCopiedMaya(false), 2000)
    }
  }

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#F4F6F8' }}>

      <div>
        <NavbarComponent />
      </div>

      <div className='container' style={{ width: '100%', padding: 20 }}>

        <div>
          <h2 style={{ fontWeight: 'bold' }}>Support Us</h2>
          <span>PixiShift is free for everyone. If it's helped you, consider buying us a coffee! ☕</span>
        </div>

        <br />

        <Card className='uploadCol'>
          <Row style={{ padding: '5px', height: '100%', width: '100%' }}>
            <Col style={{ width: '100%', padding: '24px' }}>

              {/* Ko-fi */}
              <div style={sectionStyle}>
                <div style={labelStyle}>☕ Ko-fi</div>
                <p style={descStyle}>Support us internationally via Ko-fi.</p>
                <a href='https://ko-fi.com/I2I81X0TMG' target='_blank' rel='noreferrer'>
                  <img
                    height='36'
                    style={{ border: '0px', height: '36px' }}
                    src='https://storage.ko-fi.com/cdn/kofi5.png?v=6'
                    border='0'
                    alt='Buy Me a Coffee at ko-fi.com'
                  />
                </a>
              </div>

              <hr style={{ borderColor: '#e9ecef', margin: '20px 0' }} />

              {/* GCash */}
              <div style={sectionStyle}>
                <div style={labelStyle}>
                  <img
                    src={gcashLogo}
                    alt='GCash'
                    style={{ height: 22, marginRight: 8, verticalAlign: 'middle' }}
                  />
                  GCash
                </div>
                <p style={descStyle}>Send your support via GCash.</p>
                <div style={numberBoxStyle}>
                  <span style={{ fontWeight: '600', fontSize: 16, letterSpacing: 1 }}>{GCASH_NUMBER}</span>
                  <button
                    onClick={() => handleCopy(GCASH_NUMBER, 'gcash')}
                    style={copyBtnStyle}
                  >
                    {copiedGcash ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>

              <hr style={{ borderColor: '#e9ecef', margin: '20px 0' }} />

              {/* Maya */}
              <div style={sectionStyle}>
                <div style={labelStyle}>
                  <img
                    src={mayaLogo}
                    alt='Maya'
                    style={{ height: 22, marginRight: 8, verticalAlign: 'middle' }}
                  />
                  Maya
                </div>
                <p style={descStyle}>Send your support via Maya.</p>
                <div style={numberBoxStyle}>
                  <span style={{ fontWeight: '600', fontSize: 16, letterSpacing: 1 }}>{MAYA_NUMBER}</span>
                  <button
                    onClick={() => handleCopy(MAYA_NUMBER, 'maya')}
                    style={copyBtnStyle}
                  >
                    {copiedMaya ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>

            </Col>
          </Row>
        </Card>

        <br />

        <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
          Every bit of support helps keep PixiShift free and running. Thank you! 🙏
        </p>

      </div>

      <div>
        <FooterComponent />
      </div>

    </div>
  )
}

const sectionStyle = {
  marginBottom: 4,
}

const labelStyle = {
  fontSize: 15,
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: 6,
  display: 'flex',
  alignItems: 'center',
}

const descStyle = {
  fontSize: 13,
  color: '#6b7280',
  marginBottom: 10,
}

const numberBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  backgroundColor: '#eef1fd',
  borderRadius: 8,
  padding: '12px 16px',
  width: 'fit-content',
}

const copyBtnStyle = {
  backgroundColor: '#1a3de4',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '6px 12px',
  fontSize: 12,
  cursor: 'pointer',
}

export default SupportPage
