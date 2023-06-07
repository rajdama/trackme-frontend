import { combineReducers } from 'redux'
import auth_reducer from './auth_reducer'
import user_reducer from './user_reducer'

const rootReducer = combineReducers({
  auth: auth_reducer,
  user: user_reducer,
})

export default rootReducer
