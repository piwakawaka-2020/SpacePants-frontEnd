import { SET_LOCAL_SOCKET, SET_LOCAL_USER} from '../actions/localUser'

const localUser = (state = {}, action) => {
  switch(action.type) {
    case SET_LOCAL_SOCKET :
      state.socket = action.socket
      return state

    case SET_LOCAL_USER :
      state.name = action.name
      state.room = action.room
      return state
    
      default: 
        return state
  }
}

export default localUser