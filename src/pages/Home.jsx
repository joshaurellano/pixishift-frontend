import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { SiConvertio } from 'react-icons/si'
import { GiResize } from 'react-icons/gi'
import { FaCompressArrowsAlt } from 'react-icons/fa'
import { FaFileImage } from 'react-icons/fa6'
import { SiRemovedotbg } from 'react-icons/si'
import { MdBrandingWatermark } from 'react-icons/md'
import { GrDocumentPdf } from 'react-icons/gr'
import { MdPictureAsPdf } from 'react-icons/md'
import { FaCodeMerge } from 'react-icons/fa6'
import { CgCompressV } from 'react-icons/cg'
import { SiLibreofficebase } from 'react-icons/si'
import { FaFileWord } from 'react-icons/fa'

import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

const tools = {
  'Image Tools': {
    accent: '#3b82f6',
    bg: '#eff6ff',
    icon: '🖼️',
    items: [
      { label: 'Image Converter', route: 'image-conversion', icon: <SiConvertio />, desc: 'Convert between JPG, PNG, WebP & more' },
      { label: 'Image Resizer', route: 'image-resize', icon: <GiResize />, desc: 'Resize images to desired dimensions' },
      { label: 'Image Compressor', route: 'image-compress', icon: <FaCompressArrowsAlt />, desc: 'Reduce file size without quality loss' },
      { label: 'Image to PDF', route: 'image-pdf', icon: <GrDocumentPdf />, desc: 'Bundle images into a single PDF' },
      { label: 'Background Remover', route: '/bg-remove', icon: <SiRemovedotbg />, desc: 'Remove backgrounds automatically' },
      { label: 'Image Watermark', route: 'image-watermark', icon: <MdBrandingWatermark />, desc: 'Add custom watermarks' },
    ],
  },
  'PDF Tools': {
    accent: '#f97316',
    bg: '#fff7ed',
    icon: '📄',
    items: [
      { label: 'PDF to Images', route: 'pdf-image', icon: <MdPictureAsPdf />, desc: 'Extract pages as high-quality images' },
      { label: 'PDF Merger', route: 'pdf-merge', icon: <FaCodeMerge />, desc: 'Combine multiple PDFs into one' },
      { label: 'PDF Compressor', route: 'pdf-compress', icon: <CgCompressV />, desc: 'Shrink PDF file size instantly' },
    ],
  },
  'Office Tools': {
    accent: '#10b981',
    bg: '#ecfdf5',
    icon: '💼',
    items: [
      { label: 'Office to PDF', route: 'doc-conversion', icon: <SiLibreofficebase />, desc: 'Convert DOCX, XLSX, PPTX to PDF', state: { type: 'DOCX' } },
      { label: 'PDF to DOCX', route: 'pdf-docx', icon: <FaFileWord />, desc: 'Convert PDFs back to editable Word docs' },
    ],
  },
}

const howItWorks = [
  { title: 'Upload', desc: 'Drop your file or click to browse from your device.', icon: '⬆' },
  { title: 'Process', desc: 'Our tools handle everything instantly in your browser.', icon: '⚡' },
  { title: 'Download', desc: 'Get your converted file in seconds, no watermarks.', icon: '⬇' },
]

function ToolTile({ label, icon, accent, bg, desc, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? accent : '#e9ecef'}`,
        borderRadius: 16,
        padding: '24px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 10px 24px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        marginBottom: 12,
        color: accent,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', lineHeight: 1.3 }}>
        {label}
      </span>
      <p style={{ fontSize: 12.5, color: '#9ca3af', margin: '5px 0 0', lineHeight: 1.4 }}>
        {desc}
      </p>
    </div>
  )
}

function ToolSection({ name, accent, bg, icon, items, navigate }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: bg, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 16,
        }}>
          {icon}
        </div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#374151', margin: 0, letterSpacing: '-0.01em' }}>
          {name}
        </h2>
        <div style={{ flex: 1, height: 1, backgroundColor: '#e9ecef', marginLeft: 4 }} />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 12,
      }}>
        {items.map(({ label, route, icon: itemIcon, desc, state }) => (
          <ToolTile
            key={label}
            label={label} icon={itemIcon} accent={accent} bg={bg} desc={desc}
            onClick={() => navigate(route, state ? { state } : undefined)}
          />
        ))}
      </div>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6fb', overflowX: 'hidden', fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}>
      <NavbarComponent />

      {/* ── Hero ── */}
      <div style={{
        padding: '56px 24px 48px',
        background: 'linear-gradient(135deg, #1a3de4 0%, #1228a8 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
       
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <h1 style={{
            color: '#ffffff', fontWeight: 800, fontSize: '2.3rem',
            lineHeight: 1.2, marginBottom: 14, letterSpacing: '-0.03em',
          }}>
            Transform your files,<br />elevate your work
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.75)', fontSize: 15,
            marginBottom: 30, lineHeight: 1.6,
          }}>
            Free online image and document tools — no signup, no watermarks.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => document.getElementById('tools-section').scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: '#fff', color: '#1a3de4',
                border: 'none', borderRadius: 10,
                padding: '12px 28px', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                letterSpacing: '-0.01em',
              }}>
              Get Started — it's free
            </button>
            <button
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 10,
                padding: '12px 22px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', letterSpacing: '-0.01em',
              }}>
              How it Works
            </button>
          </div>
        </div>
      </div>

      {/* ── Tools ── */}
      <div id="tools-section" style={{ padding: '36px 24px 0', maxWidth: 960, margin: '0 auto' }}>
        {Object.entries(tools).map(([name, { accent, bg, icon, items }]) => (
          <ToolSection
            key={name}
            name={name} accent={accent} bg={bg} icon={icon} items={items}
            navigate={navigate}
          />
        ))}
      </div>

      {/* ── Also by PixiShift banner ── */}
      <div style={{ padding: '8px 24px 0', maxWidth: 960, margin: '0 auto' }}>
        <div style={{
          borderRadius: 14,
          border: '1.5px solid #e9ecef',
          backgroundColor: '#fff',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 14,
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: '#f0fdf4', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 20,
          }}>🔗</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1f2937', margin: '0 0 2px' }}>
              Also by PixiShift
            </p>
            <p style={{ fontSize: 12.5, color: '#6b7280', margin: 0 }}>
              Trimmr — URL shortener &amp; QR code generator
            </p>
          </div>
          <a
            href="https://trimmr-online.vercel.app"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              backgroundColor: '#f4f6fb', color: '#1a3de4',
              border: '1.5px solid #dbeafe', borderRadius: 8,
              padding: '7px 14px', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', flexShrink: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4f6fb'}
          >
            Visit Trimmr
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── How It Works ── */}
      <div id="how-it-works" style={{ padding: '52px 24px 0', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 6 }}>
            How It Works
          </h2>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Three steps. No account needed.</p>
        </div>

        <Row className="g-3 justify-content-center">
          {howItWorks.map(({ title, desc, icon }) => (
            <Col key={title} md={4}>
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
      <div style={{ padding: '36px 24px 60px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{
          borderRadius: 18,
          background: '#0f172a',
          padding: '40px 48px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>

          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em', marginBottom: 10, position: 'relative' }}>
            Ready to get started?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 26, maxWidth: 380, position: 'relative' }}>
            Shift your files effortlessly and get back to what matters
          </p>
          <button
            onClick={() => document.getElementById('tools-section').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#1a3de4',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '13px 32px', fontSize: 14.5, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(26,61,228,0.4)',
              letterSpacing: '-0.01em', position: 'relative',
            }}>
            Browse All Tools →
          </button>
        </div>
      </div>

      <FooterComponent />
    </div>
  )
}

export default Home
