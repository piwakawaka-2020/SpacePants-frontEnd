import { SET_SOCKET } from '../actions/users'

const users = (state = [], action) => {
  switch(action.type) {
    case 'SET_SOCKET' :
      return [{socket: action.socket}]

    case 'SET_USER_DETAILS' :
      state[0].name = action.name,
      state[0].room = action.room
      return state

    default:
      return state
  }
}

export default users