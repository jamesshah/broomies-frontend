import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserProfile } from '../actions/userActions'

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
    <Container className='mt-5 p-5'>
      {userProfileLoading ? (
        <Loader />
      ) : userProfileError ? (
        <Message variant='danger'>{userProfileError}</Message>
      ) : user ? (
        <h1>This is {user.username}'s profile page</h1>
      ) : (
        <></>
      )}
    </Container>
  )
}

export default UserScreen
