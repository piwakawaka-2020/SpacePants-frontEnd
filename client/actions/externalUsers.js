export const ADD_EXTERNAL_USERS = 'ADD_EXTERNAL_USERS'

export const addExternalUsers = user => {
  console.log('action', user)
  return dispatch => {
    return dispatch({
      type: ADD_EXTERNAL_USERS,
      name: user
    })
  }
}