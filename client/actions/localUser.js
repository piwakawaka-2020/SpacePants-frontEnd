export const SET_LOCAL_SOCKET = 'SET_SOCKET'
export const SET_LOCAL_USER = 'SET_USER_DETAILS'

export const createUser = socket => {
  return dispatch => {
    return dispatch({
      type: SET_LOCAL_SOCKET,
      socket: socket
    })
  }
}

export function joinRoom(userData, socket) {
  socket.emit('user', (userData))

  return dispatch => {
    return dispatch({
      type: SET_LOCAL_USER,
      name: userData.name,
      room: userData.room
    })
  }
}



