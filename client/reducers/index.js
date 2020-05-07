import { combineReducers } from 'redux'

import localUser  from './localUser'
import externalUsers from './externalUsers'

export default combineReducers({
  localUser,
  externalUsers
})