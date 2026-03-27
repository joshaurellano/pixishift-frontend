import React, { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'
import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/icons/hero_icon.png'

const tools = {
  'Image Tools': {
    accent: '#3b82f6',
    bg: '#eff6ff',
    items: [
      { label: 'Image Converter', route: 'image-conversion', icon: '⇄' },
      { label: 'Image Resizer', route: 'image-resize', icon: '⤢' },
      { label: 'Image Compressor', route: 'image-compress', icon: '⊡' },
      { label: 'Image to PDF', route: 'image-pdf', icon: '⬓' },
      { label: 'Background Remover', route: '/bg-remove', icon: '✦' },
      { label: 'Image Watermark', route: 'image-watermark', icon: '◈' },
    ],
  },
  'PDF Tools': {
    accent: '#f97316',
    bg: '#fff7ed',
    items: [
      { label: 'PDF to Images', route: 'pdf-image', icon: '⬒' },
      { label: 'PDF Merger', route: 'pdf-merge', icon: '⊕' },
      { label: 'PDF Compressor', route: 'pdf-compress', icon: '⊟' },
    ],
  },
  'Office Tools': {
    accent: '#10b981',
    bg: '#ecfdf5',
    items: [
      { label: 'Office to PDF', route: 'doc-conversion', icon: '⇪', state: { type: 'DOCX' } },
      { label: 'PDF to DOCX', route: 'pdf-docx', icon: '⇩' },
    ],
  },
}

function ToolCard({ label, icon, accent, bg, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '11px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        backgroundColor: hovered ? bg : '#fff',
        border: `1.5px solid ${hovered ? accent : '#e9ecef'}`,
        transition: 'all 0.17s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? `0 4px 12px ${accent}25` : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <span style={{
        fontSize: 15,
        color: accent,
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        borderRadius: 7,
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{
        fontSize: 13.5,
        fontWeight: 500,
        color: hovered ? '#111827' : '#374151',
      }}>
        {label}
      </span>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fb', overflowX: 'hidden' }}>
      <NavbarComponent />

      <div style={{ padding: '24px 24px 0' }}>
        <Card style={{
          border: 'none',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #1a3de4 0%, #0ab8a0 100%)',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 240,
        }}>
          <div style={{
            position: 'absolute', width: 300, height: 300,
            borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)',
            top: -80, right: 260, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', width: 200, height: 200,
            borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)',
            bottom: -60, left: '40%', pointerEvents: 'none',
          }} />

          <Card.Body style={{ padding: '48px 52px' }}>
            <Row className="align-items-center">
              <Col md={6}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 20,
                  padding: '4px 14px',
                  marginBottom: 18,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#a3f7bf' }} />
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 500 }}>
                    Free — No sign up needed
                  </span>
                </div>

                <h1 style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  lineHeight: 1.2,
                  marginBottom: 24,
                  letterSpacing: '-0.02em',
                }}>
                  Shift your files,<br />
                  simplify your workflow
                </h1>

                <button style={{
                  backgroundColor: '#fff',
                  color: '#1a3de4',
                  border: 'none',
                  borderRadius: 10,
                  padding: '11px 26px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  letterSpacing: '-0.01em',
                }}>
                  Get Started — It's Free
                </button>
              </Col>

              <Col md={6} className="d-flex justify-content-center align-items-center mt-4 mt-md-0">
                <img
                  src={heroImg}
                  alt="hero"
                  style={{ maxHeight: 180, objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))' }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div style={{ padding: '32px 24px 60px' }}>
        <p style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: '#9ca3af',
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
          marginBottom: 20,
        }}>
          All Tools
        </p>

        <Row className="g-4">
          {Object.entries(tools).map(([category, { accent, bg, items }]) => (
            <Col key={category} lg={4}>
              <Card style={{
                border: '1px solid #e9ecef',
                borderRadius: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                height: '100%',
              }}>
                <Card.Body style={{ padding: 22 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 16,
                  }}>
                    <div style={{
                      width: 10, height: 10,
                      borderRadius: '50%',
                      backgroundColor: accent,
                      boxShadow: `0 0 0 3px ${accent}28`,
                    }} />
                    <span style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0f172a',
                      letterSpacing: '-0.01em',
                    }}>
                      {category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map(({ label, route, icon, state }) => (
                      <ToolCard
                        key={label}
                        label={label}
                        icon={icon}
                        accent={accent}
                        bg={bg}
                        onClick={() => navigate(route, state ? { state } : undefined)}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home
