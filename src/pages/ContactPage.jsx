import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import FooterComponent from '../components/FooterComponent'
import NavbarComponent from '../components/NavbarComponent'

import '../styles/uploadCol.css'

const CONTACT_EMAIL = 'joshuaofficialbusiness1@gmail.com'

function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#F4F6F8' }}>

      <div>
        <NavbarComponent />
      </div>

      <div className='container' style={{ width: '100%', padding: 20 }}>

        <div>
          <h2 style={{ fontWeight: 'bold' }}>Contact Us</h2>
          <span>Have questions or feedback? Feel free to reach out to us.</span>
        </div>

        <br />

        <div>
          <Card className='uploadCol'>
            <Row style={{ padding: '5px', height: '100%', width: '100%' }}>
              <Col style={{ width: '100%', padding: '24px' }}>

                <div style={{
                  backgroundColor: '#eef1fd',
                  borderRadius: 8,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14
                }}>
                  <span style={{ fontSize: 28 }}>✉️</span>
                  <div>
                    <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>
                      For business inquiries and concerns, you can reach us at:
                    </div>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      style={{ color: '#1a3de4', fontWeight: '600', fontSize: 16, textDecoration: 'none' }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

              </Col>
            </Row>
          </Card>
        </div>

      </div>

      <div>
        <FooterComponent />
      </div>

    </div>
  )
}

export default ContactPage
