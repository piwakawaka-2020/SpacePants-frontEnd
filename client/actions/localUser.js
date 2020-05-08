export const SET_LOCAL_SOCKET = 'SET_SOCKET'
export const SET_LOCAL_USER = 'SET_USER_DETAILS'
export const SET_TASK = 'SET_TASK'
export const SET_HINT = 'SET_HINT'
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE'
export const SET_ROLE = 'SET_ROLE'

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

export function addRole(role) {
  return dispatch => {
    return dispatch({
      type: SET_ROLE,
      role: role
    })
  }
}

export function receiveHint(hint) {
  return dispatch => {
    return dispatch({
      type: SET_HINT,
      hint: hint
    })
  }
}

export function receiveTask(task) {
  return dispatch => {
    return dispatch({
      type: SET_TASK,
      task:task
    })
  }
}

//sends info that task is complete
export function doComplete(socket, room) {
  socket.emit('completeTask', room)
  return dispatch => {
    return dispatch({
      type: SET_TASK_COMPLETE,
    })
  }
}

//sends info that user has skipped
export function doSkip(socket) {
  socket.emit('skipTask')
}

// sends info that user wants to do a vote
export function doVote() {
  socket.emit('vote')
}



