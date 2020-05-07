import { addExternalUsers } from '../actions/externalUsers'
import {recieveHint, recieveTask} from '../actions/localUser'

export function subscriptions(socket, props) {
  socket.on('user', user => {
    props.dispatch(addExternalUsers(user))
  })
  socket.on('hint', hint => {
    props.dispatch(recieveHint(hint))
  })
  socket.on('task', task => {
    props.dispatch(recieveTask(task))
  })
  socket.on('role', role => {
    props.dispatch(addRole(role))
  })
  socket.on('skip', () => {
    //do something
  })
  socket.on('commenceVote', () => {
    //dispatch to switch to vote screen and use saved externalUsers to display a list of people to vote for
  })
}
