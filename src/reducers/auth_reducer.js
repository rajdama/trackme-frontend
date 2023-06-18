import { auth_constants } from '../actions/constants'

const initialState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  authenticate: false,
  authenticating: false,
}

export default function auth_reducer(state = initialState, action) {
  switch (action.type) {
    case auth_constants.USER_REGISTER_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case auth_constants.USER_REGISTER_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      }
      break
    case auth_constants.USER_REGISTER_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    case auth_constants.LOGIN_REQUEST:
      console.log(action)
      state = {
        ...state,
        authenticating: true,
      }
      break
    case auth_constants.LOGIN_SUCCESS:
      console.log(action)
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      }
      break
    case auth_constants.LOGOUT_REQUEST:
      console.log(action)
      state = {
        ...initialState,
        loading: true,
      }
      break
    case auth_constants.GET_UPDATED_USER_REQUEST:
      console.log(action)
      state = {
        ...state,
        loading: true,
      }
      break
    case auth_constants.GET_UPDATED_USER_SUCCESS:
      console.log(action)
      state = {
        ...state,
        loading: false,
        user: action.payload.user,
      }
      break
    case auth_constants.GET_UPDATED_USER_FAILURE:
      console.log(action)
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
    default:
      console.log(action)
  }

  return state
}
