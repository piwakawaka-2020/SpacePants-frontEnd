import { ADD_EXTERNAL_USERS } from '../actions/externalUsers'

const externalUsers = (state = [], action) => {
  switch(action.type) {

    case ADD_EXTERNAL_USERS :
      return action.name

    default:
      return state
  }
}

export default externalUsers