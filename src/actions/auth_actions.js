import { serverAxiosInstance } from '../helpers/axios'
import { auth_constants } from './constants'

const setHeaders = (token) => {
  let setHeader = {
    headers: { authorization: token ? `Bearer ${token}` : '' },
  }
  return setHeader
}

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: auth_constants.USER_REGISTER_REQUEST })
    const res = await serverAxiosInstance.post('/signup', {
      ...user,
    })
    console.log(res)

    if (res.status === 200) {
      const data = res.data
      dispatch({
        type: auth_constants.USER_REGISTER_SUCCESS,
        payload: { data },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: auth_constants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const login = (user) => {
  console.log(user)
  return async (dispatch) => {
    dispatch({ type: auth_constants.LOGIN_REQUEST })
    const res = await serverAxiosInstance.post('/signin', {
      ...user,
    })

    if (res.status === 200) {
      const { token, user } = res.data
      localStorage.setItem('token', token)
      dispatch({
        type: auth_constants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: auth_constants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const getUpdatedUser = (userId, goal, token) => {
  return async (dispatch) => {
    dispatch({ type: auth_constants.GET_UPDATED_USER_REQUEST })
    const res = await serverAxiosInstance.post(
      '/getUpdateduser',
      {
        userId,
        goal,
      },
      setHeaders(token)
    )
    console.log(res)

    if (res.status === 200) {
      dispatch({
        type: auth_constants.GET_UPDATED_USER_SUCCESS,
        payload: { user: res.data },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: auth_constants.GET_UPDATED_USER_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: auth_constants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      dispatch({
        type: auth_constants.LOGIN_FAILURE,
        payload: { error: 'login failed !!' },
      })
    }
  }
}

export const signout = () => {
  return async (dispatch) => {
    localStorage.clear()
    dispatch({
      type: auth_constants.LOGOUT_REQUEST,
    })
  }
}
