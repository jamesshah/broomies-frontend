import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserProfile } from '../actions/userActions'
import { Facebook, Instagram, Linkedin, Twitter } from 'react-bootstrap-icons'

const UserScreen = ({ match, history }) => {
  const {
    params: { username },
  } = match

  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.userProfile)
  const { userProfileLoading, user, userProfileError } = userProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // redirect logged in user to profile screen
    if (userInfo && userInfo.username === username) {
      history.replace('/profile')
    }
    dispatch(getUserProfile(username))
  }, [username, userInfo, history, dispatch])

  return (
    <section
      className='p-3 p-md-5 mt-5'
      style={{
        backgroundColor: '#111213',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      {userProfileLoading ? (
        <Loader />
      ) : userProfileError ? (
        <Message variant='danger'>{userProfileError}</Message>
      ) : user ? (
        <Container
          className='p-4 rounded shadow mt-4'
          style={{ backgroundColor: 'rgb(33,34,36)' }}
        >
          <h1 className='mb-3 text-center'>@{user.username}</h1>
          <p className='text-center h6' style={{ color: '#9CA3AF' }}>
            {user.gender} · {user.category}
          </p>
          <p className='mb-4 text-center'>
            Looking for a roommate near :{' '}
            <span className='h6'> {user.location.place_name} </span>
          </p>
          <hr />
          <h3 className='mb-2'># Bio</h3>
          <p className='mb-4'>{user.bio}</p>
          <h3 className='mb-2'>Social Links</h3>
          {user.facebook.length !== 0 && (
            <a
              rel='noreferrer'
              href={`${user.facebook}`}
              className='text-decoration-none btn btn-outline-light'
              target='_blank'
            >
              <Facebook /> {user.facebook}
            </a>
          )}
          {user.instagram.length !== 0 && (
            <a
              rel='noreferrer'
              href={`${user.instagram}`}
              className='text-decoration-none btn btn-outline-light'
              target='_blank'
            >
              <Instagram /> {user.instagram}
            </a>
          )}
          {user.twitter.length !== 0 && (
            <a
              rel='noreferrer'
              href={`${user.twitter}`}
              className='text-decoration-none btn btn-outline-light'
              target='_blank'
            >
              <Twitter /> {user.twitter}
            </a>
          )}
          {user.linkedin.length !== 0 && (
            <a
              rel='noreferrer'
              href={`${user.linkedin}`}
              className='text-decoration-none btn btn-outline-light'
              target='_blank'
            >
              <Linkedin /> {user.linkedin}
            </a>
          )}
        </Container>
      ) : (
        <></>
      )}
    </section>
  )
}

export default UserScreen
