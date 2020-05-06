export const CREATE_USER = 'CREATE_USER'
export const SET_SOCKET = 'SET_SOCKET'

import { openSocket } from '../apis/users'



export function setUserDetails(userData)  {
  return {
    type: "SET_USER_DETAILS",
    name: userData.name,
    room: userData.room
  }
}











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
export function joinRoom(userData) {
  return (dispatch) => {
    socket.emit('user', (userData))
    .then(() => {
      dispatch(setUserDetails(userData))
    })

  }
}


