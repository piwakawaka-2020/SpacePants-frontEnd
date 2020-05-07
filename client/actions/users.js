export const SET_LOCAL_SOCKET = 'SET_SOCKET'
export const SET_LOCAL_USER = 'SET_USER_DETAILS'
export const GET_EXTERNAL_USERS = 'GET_EXTERNAL_USERS'

export const createUser = socket => {

  return dispatch => {
    return dispatch({
      type: SET_LOCAL_SOCKET,
      socket: socket
    })
  }
}

export const addExternalUsers = user => {
  return dispatch => {
    return dispatch({
      type: GET_EXTERNAL_USERS,
      user
    })
  }
}

export function joinRoom(userData, socket) {
  socket.emit('user', (userData))

  console.log('yes')
  return dispatch => {
    return dispatch({
      type: SET_LOCAL_USER,
      name: userData.name,
      room: userData.room
    })
  }
}



