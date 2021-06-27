import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useMediaQuery } from 'react-responsive'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import AutoComplete from '../components/AutoComplete'

const ProfileScreen = ({ history }) => {
  const [bioLength, setBioLength] = useState(0)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [category, setCategory] = useState(null)
  const [gender, setGender] = useState(null)
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedin, setLinkedin] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { userDetailsLoading, userDetailsError, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { userUpdateProfileLoading, userUpdateProfileError, success } =
    userUpdateProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const isMobile = useMediaQuery({
  //   query: '(max-width: 576px)',
  // })

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 768px)',
  })

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=profile')
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setUsername(user.username)
        setEmail(user.email)
        setBio(user.bio)
        setBioLength(user.bio.length)
        setUserLocation(user.location)
        setPlaceName(user.location.place_name)
        setCategory(user.category)
        setGender(user.gender)
        setFacebook(user.facebook)
        setInstagram(user.instagram)
        setTwitter(user.twitter)
        setLinkedin(user.linkedin)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(username)
    console.log(email)
    console.log(password)
    dispatch(
      updateUserProfile({
        email,
        username,
        password,
        bio,
        userLocation,
        category,
        gender,
        facebook,
        instagram,
        twitter,
        linkedin,
      })
    )
  }

  return (
    <section
      className='p-5 mt-5'
      style={{
        backgroundColor: '#111213',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      {/* <Container
        className='p-4 rounded shadow'
        style={{ backgroundColor: 'rgb(33,34,36)' }}
      > */}
      {userDetailsError ? (
        <Message variant='danger'>{userDetailsError}</Message>
      ) : userUpdateProfileError ? (
        <Message variant='danger'>{userUpdateProfileError}</Message>
      ) : success ? (
        <Message variant='success'>Profile Updated Successfully</Message>
      ) : userDetailsLoading || userUpdateProfileLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Container
            className='p-4 rounded shadow mb-4'
            style={{ backgroundColor: 'rgb(33,34,36)' }}
          >
            <Row className='align-items-center'>
              <Col>
                <h2 className='mb-4'>Account Information</h2>
                {/* Username field */}
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col style={{ display: !isDesktopOrLaptop && 'none' }}>
                <Image src='/images/account-info.svg' fluid />
              </Col>
            </Row>
          </Container>

          {/* Personal Details Container */}
          <Container
            className='p-4 rounded shadow mb-4'
            style={{ backgroundColor: 'rgb(33,34,36)' }}
          >
            <Row>
              <Col>
                <h2 className='mb-4'>Personal Details</h2>
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>
                    Bio <span className='text-muted '>({bioLength}/200)</span>{' '}
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={4}
                    maxLength={200}
                    placeholder='A short description about yourself...'
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value)
                      setBioLength(e.target.value.length)
                    }}
                    style={{ resize: 'none' }}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Location</Form.Label>
                  <AutoComplete
                    placeName={placeName}
                    setUserLocation={setUserLocation}
                  />
                </Form.Group>
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
                    checked={category === 'Student'}
                  />
                  <Form.Check
                    label='Working Professional'
                    name='category'
                    type='radio'
                    id='inline-radio-2'
                    value='Working Professional'
                    onChange={(e) => setCategory(e.target.value)}
                    checked={category === 'Working Professional'}
                  />
                  <Form.Check
                    label='Other'
                    name='category'
                    type='radio'
                    id='inline-radio-3'
                    value='Other'
                    onChange={(e) => setCategory(e.target.value)}
                    checked={category === 'Other'}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Your Pronouns (optional)</Form.Label>
                  <Form.Control
                    as='select'
                    size='md'
                    onChange={(e) => setGender(e.target.value)}
                    defaultValue={gender}
                  >
                    <option value='' selected={gender === ''}>
                      Select...
                    </option>
                    <option value='He/him' selected={gender === 'He/him'}>
                      He/him
                    </option>
                    <option value='She/her' selected={gender === 'She/her'}>
                      She/her
                    </option>
                    <option value='They/them' selected={gender === 'They/them'}>
                      They/them
                    </option>
                    <option value='not-specified' selected='not-specified'>
                      I prefer not to say
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col style={{ display: !isDesktopOrLaptop && 'none' }}>
                <Image src='/images/personal-details.svg' fluid />
              </Col>
            </Row>
          </Container>

          <Container
            className='p-4 rounded shadow mb-4'
            style={{ backgroundColor: 'rgb(33,34,36)' }}
          >
            <Row className='align-items-center'>
              <Col>
                <h2 className='mb-4'>Social Links</h2>
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='https://www.facebook.com/james.shah.07'
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='https://www.instagram.com/shahbutbetter'
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='https://www.twitter.com/shahbutbetter'
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId=''>
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='https://www.linkedin.com/in/james-shah'
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col style={{ display: !isDesktopOrLaptop && 'none' }}>
                <Image src='/images/social-links.svg' fluid />
              </Col>
            </Row>
          </Container>
          <Container
            className='p-4 mb-4 rounded shadow'
            style={{ backgroundColor: 'rgb(33,34,36)' }}
          >
            <Button
              style={{ backgroundColor: '#4D61FC', width: '100%' }}
              variant='primary'
              type='submit'
            >
              Update
            </Button>
          </Container>
        </Form>
      )}
      {/* </Container> */}
    </section>
  )
}

export default ProfileScreen
