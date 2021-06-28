import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList, getFavouriteList } from '../actions/userActions'
import { Container, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import User from '../components/User'

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { userListLoading, userListError, users } = userList

  const userFavourite = useSelector((state) => state.userFavourite)
  const { userFavouriteLoading, userFavouriteError, favourites } = userFavourite

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!favourites) dispatch(getFavouriteList())
      if (!users) dispatch(getUserList())
    }
  }, [dispatch, history, userInfo, users, favourites])

  return (
    <section
      style={{ backgroundColor: '#111213', color: 'white', minHeight: '100vh' }}
    >
      <Container className='p-5 mt-5'>
        <h1 className='mb-3' style={{ fontWeight: '700' }}>
          People Looking for a roommate near you
        </h1>
        {userListError ? (
          <Message variant='danger'>{userListError}</Message>
        ) : userFavouriteError ? (
          <Message variant='danger'>{userFavouriteError}</Message>
        ) : userListLoading || userFavouriteLoading ? (
          <Loader />
        ) : (
          <>
            <Row>
              {users &&
                users.map((user) => (
                  <User
                    user={user}
                    key={user.id}
                    favourite={favourites.some(
                      (favourite) => user.id === favourite.id
                    )}
                  />
                ))}
            </Row>
          </>
        )}
      </Container>
    </section>
  )
}

export default HomeScreen
