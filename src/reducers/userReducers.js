import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_FAVOURITE_LIST_SUCCESS,
  USER_FAVOURITE_LIST_FAIL,
  USER_FAVOURITE_LIST_REQUEST,
  USER_ADD_FAVOURITE_REQUEST,
  USER_ADD_FAVOURITE_FAIL,
  USER_ADD_FAVOURITE_SUCCESS,
  USER_DELETE_FAVOURITE_REQUEST,
  USER_DELETE_FAVOURITE_FAIL,
  USER_DELETE_FAVOURITE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../constants/userConstants'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { userRegisterLoading: true }
    case USER_REGISTER_FAIL:
      return { userRegisterLoading: false, userRegisterError: action.payload }
    case USER_REGISTER_SUCCESS:
      return { userRegisterLoading: false, userInfo: action.payload }
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { userLoginLoading: true }
    case USER_LOGIN_FAIL:
      return { userLoginLoading: false, userLoginError: action.payload }
    case USER_LOGIN_SUCCESS:
      return { userLoginLoading: false, userInfo: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, userDetailsLoading: true }
    case USER_DETAILS_SUCCESS:
      return { userDetailsLoading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { userDetailsLoading: false, userDetailsError: action.payload }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, userUpdateProfileLoading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        userUpdateProfileLoading: false,
        success: true,
        userInfo: action.payload,
      }
    case USER_UPDATE_PROFILE_FAIL:
      return {
        userUpdateProfileLoading: false,
        userUpdateProfileError: action.payload,
      }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { userListLoading: true }
    case USER_LIST_SUCCESS:
      return { userListLoading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { userListLoading: false, userListError: action.payload }
    default:
      return state
  }
}

export const userFavouriteReducer = (state = { favourites: null }, action) => {
  switch (action.type) {
    case USER_FAVOURITE_LIST_REQUEST:
      return { userFavouriteLoading: true }
    case USER_FAVOURITE_LIST_SUCCESS:
      return { userFavouriteLoading: false, favourites: action.payload }
    case USER_FAVOURITE_LIST_FAIL:
      return { userFavouriteLoading: false, userFavouriteError: action.payload }
    case USER_ADD_FAVOURITE_REQUEST:
      return { ...state, userFavouriteLoading: true }
    case USER_ADD_FAVOURITE_SUCCESS:
      const { favs, newFav } = action.payload
      return {
        userFavouriteLoading: false,
        success: true,
        favourites: favs.concat(newFav),
      }
    case USER_ADD_FAVOURITE_FAIL:
      return { userFavouriteLoading: false, userFavouriteError: action.payload }
    case USER_DELETE_FAVOURITE_REQUEST:
      return { ...state, userFavouriteLoading: true }
    case USER_DELETE_FAVOURITE_SUCCESS:
      const { favs_d, fav_id } = action.payload
      const updatedFavs = favs_d.filter((fav) => fav.id !== fav_id)
      return {
        userFavouriteLoading: false,
        success: true,
        favourites: updatedFavs,
      }
    case USER_DELETE_FAVOURITE_FAIL:
      return { userFavouriteLoading: false, userFavouriteError: action.payload }
    default:
      return state
  }
}

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { userProfileLoading: true }
    case USER_PROFILE_SUCCESS:
      return { userProfileLoading: false, user: action.payload }
    case USER_PROFILE_FAIL:
      return { userProfileLoading: false, userProfileError: action.payload }
    default:
      return state
  }
}
