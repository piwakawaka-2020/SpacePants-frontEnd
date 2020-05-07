import { addExternalUsers } from '../actions/externalUsers'

export function subscriptions(socket, props) {
  socket.on('user', user => {
    props.dispatch(addExternalUsers(user))
  })
}