import { addExternalUsers } from '../actions/externalUsers'
import {addRole, receiveHint, receiveTask} from '../actions/localUser'

export function subscriptions(socket, props) {
  socket.on('user', user => {
    props.dispatch(addExternalUsers(user))
  })
  // socket.on('role', role => {
  //   props.dispatch(addRole(role))
  // })
  socket.on('hint', hint => {
    props.dispatch(receiveHint(hint))
  })
  // socket.on('task', task => {
  //   props.dispatch(receiveTask(task))
  // })
  socket.on('skip', () => {
    //do something regarding skip penalty
  })
  socket.on('commenceVote', () => {
    //dispatch to switch to vote screen and use saved externalUsers to display a list of people to vote for
  })

}
