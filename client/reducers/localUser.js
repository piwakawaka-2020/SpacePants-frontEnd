import { SET_LOCAL_SOCKET, SET_LOCAL_USER, SET_HINT, SET_TASK, SET_TOTAL_TASK_COMPLETE, SET_ROLE} from '../actions/localUser'

const initialState = {
  name: '',
  room: '',
  role: '',
  task: '',
  hint: '',
  completedTasks: 0
}

const localUser = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOCAL_SOCKET :
      state.socket = action.socket
      return state

    case SET_LOCAL_USER :
      state.name = action.name
      state.room = action.room
      return state
    case SET_HINT:
      state.hint = action.hint
      return state
    case SET_TASK:
      state.task = action.task
      console.log('the state is' + state.task)
      return state
    case SET_TOTAL_TASK_COMPLETE:
      state.completedTasks++
      return state
    case SET_ROLE:
      state.role = action.role
      return state
      default: 
        return state
  }
}

export default localUser