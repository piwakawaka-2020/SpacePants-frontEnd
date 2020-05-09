export const SET_LOCAL_SOCKET = 'SET_SOCKET'
export const SET_LOCAL_USER = 'SET_USER_DETAILS'
export const SET_TASK = 'SET_TASK'
export const SET_HINT = 'SET_HINT'
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE'
export const SET_ROLE = 'SET_ROLE'
export const USE_VOTE = 'USE_VOTE'

export const createUser = socket => {
  return {
    type: SET_LOCAL_SOCKET,
    socket: socket
  }
}

export function joinRoom(userData, socket) {
  socket.emit('user', (userData))
  return {
    type: SET_LOCAL_USER,
    name: userData.name,
    room: userData.room
  }
}

export function addRole(role) {
  return {
    type: SET_ROLE,
    role: role
  }
}

export function receiveHint(hint) {
  return {
    type: SET_HINT,
    hint: hint
  }
}

export function receiveTask(task) {
  return {
    type: SET_TASK,
    task: task
  }
}

export function useVote() {
  return {
    type: USE_VOTE
  }
}

export function checkVoteResult(result){
  return {
    type: 'CHECK_RESULT',
    result: result
  }
}

export function completeTask(socket, room) {
  socket.emit('completeTask', room)
  return {
    type: SET_TASK_COMPLETE,
  }
}




