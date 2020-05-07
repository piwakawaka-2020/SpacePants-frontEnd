import { ADD_EXTERNAL_USERS } from '../actions/externalUsers'

const users = [{
  name: 'user1',
},
{
  name: 'user2'
}
]

const externalUsers = (state = users, action) => {
  switch(action.type) {

    case ADD_EXTERNAL_USERS :
      return [...state, action.name]

    default:
      return state
  }
}

export default externalUsers