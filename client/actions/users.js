export const CREATE_USER = 'CREATE_USER'
export const SET_SOCKET = 'SET_SOCKET'

export const createUser = socket => {

  return dispatch => {
    return dispatch({
      type: SET_SOCKET,
      socket: socket,
      socketId: socket.id
    })
  }
}