export const CREATE_USER = 'CREATE_USER'
export const SET_SOCKET = 'SET_SOCKET'

import { openSocket } from '../apis/users'

export const createUser = socket => {
  
  return dispatch => {
    // return dispatch(openSocket(socket.id))
    //   .then(() => {
        return dispatch({
          type: SET_SOCKET,
          socket: socket
        })
      // })
  }
}