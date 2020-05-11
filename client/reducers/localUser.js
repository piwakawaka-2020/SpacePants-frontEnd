import { SET_LOCAL_SOCKET, SET_LOCAL_USER, SET_HINT, SET_TASK, SET_TASK_COMPLETE, SET_ROLE, USE_VOTE, SET_RESULT, RESET_STATE } from '../actions/localUser'

const initialState = {
  name: '',
  room: '',
  role: '',
  tasks: [],
  hints: [''],
  vote: true,
  result: '',
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
      state.hints = [action.hint, ...state.hints]
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

    case SET_RESULT:
      state.result = action.result
      return state

    case RESET_STATE:
      state.role = ''
      state.tasks = []
      state.hints = ['']
      state.vote = true
      state.result = ''
      state.completedTasks = 0

      return state

    default:
      return state
  }
}

export default localUser