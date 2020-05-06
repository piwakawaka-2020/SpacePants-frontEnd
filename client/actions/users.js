export const SET_SOCKET = 'SET_SOCKET'
export const SET_USER_DETAILS = 'SET_USER_DETAILS'

export const createUser = socket => {

  return dispatch => {
    return dispatch({
      type: SET_SOCKET,
      socket: socket
    })
  }
}

export function joinRoom(userData, socket) {
  socket.emit('user', (userData))

  console.log('yes')
  return dispatch => {
    return dispatch({
      type: SET_USER_DETAILS,
      name: userData.name,
      room: userData.room
    })
  }
}



