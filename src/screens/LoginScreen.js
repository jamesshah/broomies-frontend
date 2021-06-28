import React, { useState, useEffect } from 'react'
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Image,
} from 'react-bootstrap'
import Message from '../components/Message'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userLoginLoading, userLoginError, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/home'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    } else {
      history.push('/login')
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <>
      <Container
        className='p-5 mt-5 text-white'
        style={{
          backgroundColor: '#111213',
          maxWidth: '100vw',
        }}
      >
        <Row className='justify-content-center align-items-center'>
          <Col className='p-md-5' md>
            <Image src='/images/login2.svg' fluid />
          </Col>
          <Col
            className='p-4 shadow'
            md
            style={{ backgroundColor: 'rgb(33,34,36)' }}
          >
            <h1 className='mb-4'>Login</h1>
            {userLoginError && (
              <Message variant='danger'>{userLoginError}</Message>
            )}
            {/* {userLoginLoading && <Loader />} */}
            <Form onSubmit={submitHandler}>
              {/* Username field */}
              <Form.Group className='mb-3' controlId=''>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className=''
                  type='text'
                  placeholder='dogefather'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={true}
                />
              </Form.Group>
              {/* Password field */}
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className=''
                  type='password'
                  placeholder='dogecoin'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </Form.Group>
              {userLoginLoading ? (
                <Button
                  className='text-white'
                  disable
                  style={{ backgroundColor: '#4D61FC' }}
                >
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />{' '}
                  Loading...
                </Button>
              ) : (
                <Button
                  type='submit'
                  disabled={username === '' || password === ''}
                  style={{ backgroundColor: '#4D61FC' }}
                >
                  Login
                </Button>
              )}
            </Form>
            <Row className='my-3'>
              <Col>
                New user? <Link to='/signup'>Sign up</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default LoginScreen
