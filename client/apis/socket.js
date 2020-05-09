import { addExternalUsers } from '../actions/externalUsers'

export function subscriptions(socket, props) {
  socket.on('user', user => {
    props.dispatch(addExternalUsers(user))
  })

  socket.on('voteResult', result => {
    console.log('voteResult:', result)
  })



  socket.on('taskList', tasks => {
    console.log(tasks)
    // this.props.history.replace('/end')
  })

}
