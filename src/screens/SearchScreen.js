import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Image } from 'react-bootstrap'
import User from '../components/User'
import AutoComplete from '../components/AutoComplete'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useMediaQuery } from 'react-responsive'
import { getSearchUsers } from '../actions/userActions'

const SearchScreen = ({ history }) => {
  const [searchLocation, setSearchLocation] = useState(null)

  const isMobile = useMediaQuery({
    query: '(max-width: 576px)',
  })

  const dispatch = useDispatch()

  const userFavourite = useSelector((state) => state.userFavourite)
  const { userFavouriteLoading, userFavouriteError, favourites } = userFavourite

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const searchUsers = useSelector((state) => state.searchUsers)
  const { searchUsersLoading, users, searchUsersError } = searchUsers

  useEffect(() => {
    if (!userInfo) history.replace('/login')
  }, [userInfo, history])

  useEffect(() => {
    if (searchLocation) dispatch(getSearchUsers(searchLocation))
  }, [searchLocation, dispatch])

  return (
    <section
      className='mt-5 p-5'
      style={{
        backgroundColor: '#111213',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      <Container>
        <h1 className='mb-3' style={{ fontWeight: '700' }}>
          Search
        </h1>
        <AutoComplete
          placeholder='Search broomies near...'
          setUserLocation={setSearchLocation}
          className='mb-3'
        />
        {searchUsersError ? (
          <Message variant='danger'>{searchUsersError}</Message>
        ) : searchUsersLoading ? (
          <Loader />
        ) : users && users.length !== 0 ? (
          users.map((user) => (
            <User
              user={user}
              key={user.id}
              favourite={favourites.some(
                (favourite) => user.id === favourite.id
              )}
            />
          ))
        ) : users && users.length === 0 ? (
          <Container className='text-center p-5'>
            <h3>No broomies near {searchLocation.place_name}</h3>
          </Container>
        ) : (
          <Container className='text-center p-5'>
            <Image
              src='/images/search.svg'
              className={`${!isMobile && 'w-50 p-5'}`}
              fluid
            />
          </Container>
        )}
      </Container>
    </section>
  )
}

export default SearchScreen
