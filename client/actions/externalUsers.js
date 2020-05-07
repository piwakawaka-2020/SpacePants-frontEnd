export const ADD_EXTERNAL_USERS = 'ADD_EXTERNAL_USERS'

export const addExternalUsers = user => {
  return dispatch => {
    return dispatch({
      type: ADD_EXTERNAL_USERS,
      name: user
    })
  }
}




