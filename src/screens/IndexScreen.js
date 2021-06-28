import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'
import Footer from '../components/Footer'

const IndexScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.replace('/home')
    }
  }, [history, userInfo])

  return (
    <>
      <section
        className='p-5 text-white mt-5'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <div className='d-sm-flex align-items-center justify-content-between'>
            <div>
              <h1 style={{ fontWeight: '700' }}>Roommates That Don't Annoy!</h1>
              <p className='lead my-4'>
                Find a <strong> Sluggish Bear </strong> or a{' '}
                <strong>Hustler </strong>
                to share your room with.
              </p>
              <Link to='/signup'>
                <button
                  className='btn btn-lg text-white'
                  style={{ backgroundColor: '#4D61FC' }}
                >
                  Sign Up
                  <ArrowRight style={{ marginLeft: '10' }} />
                </button>
              </Link>
            </div>
            <Image
              src='/images/find-roommate.svg'
              alt=''
              className='w-50 d-none d-sm-block'
              fluid
            />
          </div>
        </Container>
      </section>

      <section
        className='p-md-5 text-white'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <Row className='justify-content-center align-items-center'>
            <Col md className='p-md-5'>
              <Image src='/images/nearby.svg' fluid />
            </Col>
            <Col md className='p-5'>
              <h1>Find nearby roommates</h1>
              <p className='lead'>
                Find broomies <i>bro + roomies</i> by location.
              </p>
              <p style={{ color: 'rgb(156,163,175)' }}>
                You can find users looking for a roommate by city. I'll soon be
                adding a feature to select the range to search roommates nearby.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        className='p-md-5 text-white'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <Row className='justify-content-center align-items-center'>
            <Col md className='p-5'>
              <h1>Personalised Recommendations</h1>
              <span style={{ backgroundColor: 'blue', padding: '2px' }}>
                (Coming soon)
              </span>
              <p className='lead'>
                Get the best roommate that matches your profile.
              </p>
              <p style={{ color: 'rgb(156,163,175)' }}>
                We give your recommendations for the roommates that best matches
                your Bio, Budget, Hobbies, etc. Our algorithm will serve you
                with the best results.
              </p>
            </Col>
            <Col md>
              <Image src='/images/personalised.svg' fluid />
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section
        className='p-5 text-white'
        style={{ backgroundColor: '#111213' }}
      >
        <Container>
          <h1 className='text-center mb-4'>How Does This Work?</h1>
          <Row>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/find.svg' fluid />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/chat.svg' fluid />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/meet.svg' fluid />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card>
                <Card.Body>
                  <Image src='/images/fun.svg' fluid roundedCircle />
                  <Card.Title>Find a roommate</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}
      <Footer />
    </>
  )
}

export default IndexScreen
