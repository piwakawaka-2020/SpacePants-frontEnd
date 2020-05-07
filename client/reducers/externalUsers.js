import { ADD_EXTERNAL_USERS } from '../actions/externalUsers'

const externalUsers = (state = [], action) => {
  switch(action.type) {

    case ADD_EXTERNAL_USERS :
      return [...state, action.name]

    default:
      return state
  }
}

export default externalUsers