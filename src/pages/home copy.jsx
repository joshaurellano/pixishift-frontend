import React from 'react'
import { Button,Row, Col } from 'react-bootstrap'

function Home() {
  return (
    <div>
        <Row>
            <Col>
                <Button href="/image-conversion" variant="primary"> Image Conversion </Button> 
                <Button href="/doc-conversion" variant="warning"> Document Conversion </Button> 
                <Button href="/bg-remove" variant="success"> Background Removal </Button> 
            </Col>
        </Row>
    </div>
  )
}

export default Home