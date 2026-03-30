import React, { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import NavbarComponent from '../components/NavbarComponent'
import { useNavigate } from 'react-router-dom'

const tools = {
  'Image Tools': {
    accent: '#3b82f6',
    bg: '#eff6ff',
    icon: '🖼️',
    items: [
      { label: 'Image Converter', route: 'image-conversion', icon: '⇄', desc: 'Convert between JPG, PNG, WebP & more' },
      { label: 'Image Resizer', route: 'image-resize', icon: '⤢', desc: 'Resize images to desired dimensions' },
      { label: 'Image Compressor', route: 'image-compress', icon: '⊡', desc: 'Reduce file size without quality loss' },
      { label: 'Image to PDF', route: 'image-pdf', icon: '⬓', desc: 'Bundle images into a single PDF' },
      { label: 'Background Remover', route: '/bg-remove', icon: '✦', desc: 'Remove backgrounds automatically' },
      { label: 'Image Watermark', route: 'image-watermark', icon: '◈', desc: 'Add custom watermarks' },
    ],
  },
  'PDF Tools': {
    accent: '#f97316',
    bg: '#fff7ed',
    icon: '📄',
    items: [
      { label: 'PDF to Images', route: 'pdf-image', icon: '⬒', desc: 'Extract pages as high-quality images' },
      { label: 'PDF Merger', route: 'pdf-merge', icon: '⊕', desc: 'Combine multiple PDFs into one' },
      { label: 'PDF Compressor', route: 'pdf-compress', icon: '⊟', desc: 'Shrink PDF file size instantly' },
    ],
  },
  'Office Tools': {
    accent: '#10b981',
    bg: '#ecfdf5',
    icon: '💼',
    items: [
      { label: 'Office to PDF', route: 'doc-conversion', icon: '⇪', desc: 'Convert DOCX, XLSX, PPTX to PDF', state: { type: 'DOCX' } },
      { label: 'PDF to DOCX', route: 'pdf-docx', icon: '⇩', desc: 'Convert PDFs back to editable Word docs' },
    ],
  },
}

const howItWorks = [
  { title: 'Upload', desc: 'Drop your file or click to browse from your device.', icon: '⬆' },
  { title: 'Process', desc: 'Our tools handle everything instantly in your browser.', icon: '⚡' },
  { title: 'Download', desc: 'Get your converted file in seconds, no watermarks.', icon: '⬇' },
]

function ToolCard({ label, icon, accent, bg, desc, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        backgroundColor: hovered ? bg : '#fff',
        border: `1.5px solid ${hovered ? accent : '#e9ecef'}`,
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 6px 16px ${accent}22` : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <span style={{
        fontSize: 15,
        color: accent,
        width: 34,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        borderRadius: 8,
        flexShrink: 0,
        border: `1px solid ${accent}22`,
      }}>
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: hovered ? '#111827' : '#1f2937',
        }}>
          {label}
        </span>
        <p style={{
          fontSize: 11.5,
          color: '#9ca3af',
          margin: 0,
          marginTop: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {desc}
        </p>
      </div>
      <span style={{
        color: accent,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.18s',
        fontSize: 14,
        flexShrink: 0,
      }}>
        →
      </span>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6fb', overflowX: 'hidden', fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}>
      <NavbarComponent />

      {/* ── Hero ── */}
      <div style={{ padding: '24px 24px 0' }}>
        <Card style={{
          border: 'none',
          borderRadius: 22,
          background: '#1a3de4',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 260,
        }}>
          {[
            { w: 320, h: 320, top: -90, right: 240, op: 0.07 },
            { w: 180, h: 180, bottom: -50, left: '38%', op: 0.05 },
            { w: 100, h: 100, top: 20, left: '28%', op: 0.06 },
          ].map((b, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: b.w, height: b.h,
              borderRadius: '50%',
              backgroundColor: `rgba(255,255,255,${b.op})`,
              top: b.top, bottom: b.bottom,
              left: b.left, right: b.right,
              pointerEvents: 'none',
            }} />
          ))}

          <Card.Body style={{ padding: '48px 52px' }}>
            <Row className="align-items-center">
              <Col md={6}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 20,
                  padding: '5px 14px', marginBottom: 18,
                }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                    100% Free · No sign-up needed
                  </span>
                </div>

                <h1 style={{
                  color: '#fff', fontWeight: 800, fontSize: '2.3rem',
                  lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.03em',
                }}>
                  Shift your files,<br />
                  simplify your workflow
                </h1>

                <p style={{
                  color: 'rgba(255,255,255,0.75)', fontSize: 14.5,
                  marginBottom: 28, lineHeight: 1.6, maxWidth: 380,
                }}>
                  Convert, compress, and transform images, PDFs, and Office files — all in one place, instantly.
                </p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => document.getElementById('tools-section').scrollIntoView({ behavior: 'smooth' })}
                    style={{
                      backgroundColor: '#fff', color: '#1a3de4',
                      border: 'none', borderRadius: 10,
                      padding: '11px 26px', fontSize: 14, fontWeight: 700,
                      cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                      letterSpacing: '-0.01em',
                    }}>
                    Get Started — It's Free
                  </button>
                  <button
                    onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff',
                      border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 10,
                      padding: '11px 22px', fontSize: 14, fontWeight: 600,
                      cursor: 'pointer', letterSpacing: '-0.01em',
                    }}>
                    How it Works
                  </button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* ── Tools ── */}
      <div id="tools-section" style={{ padding: '32px 24px 0' }}>
        <p style={{ fontSize: 11.5, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 20 }}>
          All Tools
        </p>

        <Row className="g-4">
          {Object.entries(tools).map(([category, { accent, bg, icon: catIcon, items }]) => (
            <Col key={category} lg={4}>
              <Card style={{
                border: '1px solid #e9ecef', borderRadius: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: '100%',
                overflow: 'hidden',
              }}>
                <div style={{
                  background: `${accent}12`,
                  borderBottom: `1px solid ${accent}22`,
                  padding: '14px 20px',
                  display: 'flex', alignItems: 'center', gap: 9,
                }}>
                  <span style={{
                    fontSize: 16, width: 34, height: 34,
                    backgroundColor: '#fff', borderRadius: 9,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 2px 8px ${accent}22`,
                    border: `1px solid ${accent}22`,
                  }}>
                    {catIcon}
                  </span>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
                    {category}
                  </span>
                </div>

                <Card.Body style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {items.map(({ label, route, icon, desc, state }) => (
                      <ToolCard
                        key={label}
                        label={label} icon={icon} accent={accent} bg={bg} desc={desc}
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

      {/* ── How It Works ── */}
      <div id="how-it-works" style={{ padding: '52px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 8 }}>
            How It Works
          </h2>
        </div>

        <Row className="g-3 justify-content-center">
          {howItWorks.map(({id, title, desc, icon }) => (
            <Col key={id} md={4}>
              <div style={{
                backgroundColor: '#fff', borderRadius: 16,
                border: '1px solid #e9ecef', padding: '28px 24px',
                textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                height: '100%',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: '#1a3de4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: 20, color: '#fff',
                  boxShadow: '0 4px 14px rgba(26,61,228,0.3)',
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* ── CTA Banner ── */}
      <div style={{ padding: '36px 24px 60px' }}>
        <div style={{
          borderRadius: 18,
          background: '#0f172a',
          padding: '40px 48px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(26,61,228,0.25)',
            top: -100, right: -60, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(14,158,137,0.2)',
            bottom: -80, left: 60, pointerEvents: 'none',
          }} />

          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em', marginBottom: 10 }}>
            Ready to get started?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 26, maxWidth: 380 }}>
            Shift your files effortlessly and get back to what matters
          </p>
          <button
            onClick={() => document.getElementById('tools-section').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#1a3de4',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '13px 32px', fontSize: 14.5, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(26,61,228,0.4)',
              letterSpacing: '-0.01em',
            }}>
            Browse All Tools →
          </button>
        </div>
      </div>

      {/* ── Footer ── */}
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
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#" style={{ fontSize: 12.5, color: '#6b7280', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
