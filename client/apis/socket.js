import { addExternalUsers} from '../actions/users'

export function subscriptions(socket) {
  socket.on('user', user => addExternalUsers(user))
}