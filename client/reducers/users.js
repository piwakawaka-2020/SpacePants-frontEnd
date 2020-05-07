import { SET_SOCKET, SET_USER_DETAILS, GET_EXTERNAL_USERS } from '../actions/users'


const users = (state = [], action) => {
  switch(action.type) {

    case SET_USER_DETAILS :
      state.name = action.name,
      state[0].room = action.room
      return state

    case GET_EXTERNAL_USERS :
      state.externalUsers = action.user

    default:
      return state
  }
}

export default users