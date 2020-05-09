import { SET_LOCAL_SOCKET, SET_LOCAL_USER, SET_HINT, SET_TASK, SET_TASK_COMPLETE, SET_ROLE, USE_VOTE } from '../actions/localUser'

const initialState = {
  name: '',
  room: '',
  role: '',
  tasks: [],
  hint: '',
  vote: true,
  completedTasks: 0
}

const localUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCAL_SOCKET:
      state.socket = action.socket
      return state

    case SET_LOCAL_USER:
      state.name = action.name
      state.room = action.room
      return state

    case SET_HINT:
      state.hint = action.hint
      return state

    case SET_TASK:
      state.tasks = [{ task: action.task, complete: false }, ...state.tasks]
      return state

    case SET_TASK_COMPLETE:
      state.tasks[0].complete = true
      state.completedTasks++
      return state

    case SET_ROLE:
      state.role = action.role
      return state

    case USE_VOTE:
      state.vote = false

    default:
      return state
  }
}

export default localUser