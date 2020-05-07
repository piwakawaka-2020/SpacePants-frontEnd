import { combineReducers } from 'redux'

import localUser  from './localUser'
import users from './users'

export default combineReducers({
  localUser,
  users
})