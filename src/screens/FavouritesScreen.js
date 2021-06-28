import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import User from '../components/User'
import Message from '../components/Message'
import { getFavouriteList, getUserList } from '../actions/userActions'
import { Link } from 'react-router-dom'

const FavouritesScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userFavourite = useSelector((state) => state.userFavourite)
  const { userFavouriteLoading, userFavouriteError, favourites } = userFavourite

  const userList = useSelector((state) => state.userList)
  const { userListLoading, userListError, users } = userList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!users) dispatch(getUserList())
      if (!favourites) dispatch(getFavouriteList())
    }
  }, [dispatch, history, userInfo, favourites, users])

  return (
    <section
      style={{ backgroundColor: '#111213', color: 'white', minHeight: '100vh' }}
    >
      <Container className='p-5 mt-5'>
        <h1 className='mb-3' style={{ fontWeight: '700' }}>
          Your Favourites
        </h1>
        {userFavouriteError ? (
          <Message variant='danger'>{userFavouriteError}</Message>
        ) : userListError ? (
          <Message variant='danger'>{userListError}</Message>
        ) : userFavouriteLoading || userListLoading ? (
          <Loader />
        ) : favourites && favourites.length !== 0 ? (
          <>
            <Row>
              {favourites.map((favourite) => (
                <User user={favourite} key={favourite.id} favourite={true} />
              ))}
            </Row>
          </>
        ) : (
          <>
            <h2 className='text-center'>
              You have no favourites!😢
              <br />
              <br />
              <Link to='/'>Go to Home</Link> and Find your roomie now!
            </h2>
          </>
        )}
      </Container>
    </section>
  )
}

export default FavouritesScreen
