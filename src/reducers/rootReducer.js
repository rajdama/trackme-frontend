import { combineReducers } from 'redux'
import auth_reducer from './auth_reducer'

const rootReducer = combineReducers({
  auth: auth_reducer,
})

export default rootReducer
