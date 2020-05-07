import { addExternalUsers } from '../actions/externalUsers'
import {doHint} from '../actions/localUser'

export function subscriptions(socket, props) {
  socket.on('user', user => {
    props.dispatch(addExternalUsers(user))
  })
  socket.on('hint', hint => {
    props.dispatch(doHint(hint))
  })
}