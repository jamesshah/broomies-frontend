import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_FAVOURITE_LIST_REQUEST,
  USER_FAVOURITE_LIST_SUCCESS,
  USER_FAVOURITE_LIST_FAIL,
  USER_ADD_FAVOURITE_REQUEST,
  USER_ADD_FAVOURITE_FAIL,
  USER_ADD_FAVOURITE_SUCCESS,
  USER_DELETE_FAVOURITE_REQUEST,
  USER_DELETE_FAVOURITE_FAIL,
  USER_DELETE_FAVOURITE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  SEARCH_USERS_FAIL,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
} from '../constants/userConstants'

export const register =
  (email, username, password, location, category, gender) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      // console.log('sending post request in userActions')
      const { data } = await axios.post(
        'http://localhost:5000/users',
        { email, username, password, location, gender, category },
        { headers: { 'Content-Type': 'application/json' } }
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      // login the users once they register
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      // console.log(error)
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    // console.log('sending post request in userActions')
    const { data } = await axios.post(
      'http://localhost:5000/users/login',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  // localStorage.removeItem('userFavourites')
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT,
  })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    // console.log('sending post request in userActions')
    const { data } = await axios.get(`http://localhost:5000/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // console.log(error)
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    // console.log('user update profile request dispatched')
    // console.log(user)

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `http://localhost:5000/users/profile`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.get('http://localhost:5000/users/', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })

    const userList = data.filter((user) => {
      return user.id !== userInfo.id
    })

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: userList,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFavouriteList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FAVOURITE_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const favourites = await axios.get(
      'http://localhost:5000/users/favourites',
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )

    console.log('favourites', favourites.data)

    // const favourites = data.filter((d) => {
    //   userInfo.favourites.includes(d.favourite_id)
    // })

    dispatch({
      type: USER_FAVOURITE_LIST_SUCCESS,
      payload: favourites.data,
    })

    // localStorage.setItem('userFavourites', favourites)
  } catch (error) {
    dispatch({
      type: USER_FAVOURITE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addFavourite = (favourite_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
      userFavourite: { favourites },
    } = getState()

    // console.log(userInfo.token)
    const { data } = await axios.post(
      'http://localhost:5000/users/favourites',
      { favourite_id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )

    console.log(data.newFavourite)

    dispatch({
      type: USER_ADD_FAVOURITE_SUCCESS,
      payload: {
        favs: favourites,
        newFav: data.newFavourite,
      },
    })
  } catch (error) {
    dispatch({
      type: USER_ADD_FAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteFavourite = (favourite_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
      userFavourite: { favourites },
    } = getState()

    // console.log(userInfo.token)
    const _ = await axios.delete('http://localhost:5000/users/favourites', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        favourite_id,
      },
    })

    console.log(_)

    dispatch({
      type: USER_DELETE_FAVOURITE_SUCCESS,
      payload: {
        favs_d: favourites,
        fav_id: favourite_id,
      },
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserProfile = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    })

    const { data } = await axios.get(
      `http://localhost:5000/users/user/${username}`
    )

    // console.log('user', data)

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getSearchUsers =
  (searchLocation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEARCH_USERS_REQUEST,
      })
      console.log(searchLocation)
      const {
        userLogin: { userInfo },
      } = getState()

      const { data } = await axios.post(
        'http://localhost:5000/users/search',
        { searchLocation },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )

      dispatch({
        type: SEARCH_USERS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SEARCH_USERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
