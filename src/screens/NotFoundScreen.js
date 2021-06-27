import React from 'react'
import { Image, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFoundScreen = () => {
  return (
    <Container className='mt-5 p-5 justify-content-center align-items-center'>
      <Row>
        <Col>
          <Image src='/images/404.svg' className='w-75' fluid />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h3>
            It seems like you're lost. Find a roommate that can help you in such
            situations! <Link to='/'> Go to Home </Link>
          </h3>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundScreen
