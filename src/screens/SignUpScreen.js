import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Spinner,
} from 'react-bootstrap'
import Message from '../components/Message'
import Footer from '../components/Footer'
import { register } from '../actions/userActions'
import AutoComplete from '../components/AutoComplete'

const SignUpScreen = ({ location, history }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [category, setCategory] = useState(null)
  const [gender, setGender] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { userRegisterLoading, userRegisterError, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/profile'

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      history.replace('/profile')
    }
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      register(email, username, password, userLocation, category, gender)
    )
  }

  return (
    <>
      <Container
        className='p-5 mt-5 mt-md-4 text-white'
        style={{
          backgroundColor: '#111213',
          maxWidth: '100vw',
        }}
      >
        <Row className='justify-content-center'>
          <Col md className='p-md-5 m-auto'>
            <Image src='/images/add_user.svg' className='' fluid />
          </Col>
          <Col
            md
            className='m-3 shadow'
            style={{ backgroundColor: 'rgb(33,34,36)' }}
          >
            <div className='m-4'>
              <h1 className='mb-4'>Join Now</h1>

              {userRegisterError && (
                <Message variant='danger'>{userRegisterError}</Message>
              )}
              {/* {userRegisterLoading && <Loader />} */}
              <Form onSubmit={submitHandler}>
                {/* Username field */}
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='elonmusk'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                  />
                </Form.Group>

                {/* Email field */}
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='elon@musk.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </Form.Group>

                {/* Password field */}
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='dogefather'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                </Form.Group>

                <hr className='my-4' />

                {/* Location Field with Autocomplete Input */}
                <Form.Group className='mb-3'>
                  <Form.Label>Location</Form.Label>
                  <AutoComplete setUserLocation={setUserLocation} />
                </Form.Group>
                <Row>
                  <Col>
                    {/* User category */}
                    <Form.Group className='mb-3'>
                      <Form.Label>You are a...</Form.Label>
                      <Form.Check
                        label='Student'
                        name='category'
                        type='radio'
                        id='inline-radio-1'
                        value='Student'
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <Form.Check
                        label='Working Professional'
                        name='category'
                        type='radio'
                        id='inline-radio-2'
                        value='Working Professional'
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <Form.Check
                        label='Other'
                        name='category'
                        type='radio'
                        id='inline-radio-3'
                        value='Other'
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3'>
                      <Form.Label>Your Pronouns (optional)</Form.Label>
                      <Form.Control
                        as='select'
                        size='md'
                        onChange={(e) => setGender(e.target.value)}
                        defaultValue=''
                      >
                        <option value=''>Select...</option>
                        <option value='He/him'>He/him</option>
                        <option value='She/her'>She/her</option>
                        <option value='They/them'>They/them</option>
                        <option value='not-specified'>
                          I prefer not to say
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                {userRegisterLoading ? (
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
                    style={{ backgroundColor: '#4D61FC' }}
                    type='submit'
                    disabled={
                      username === '' ||
                      email === '' ||
                      password === '' ||
                      userLocation == null ||
                      category == null
                    }
                  >
                    Sign up
                  </Button>
                )}
              </Form>

              {/* Link to login page if already registered */}
              <Row className='my-3'>
                <Col>
                  Already a user? <Link to='/login'>Login</Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default SignUpScreen
