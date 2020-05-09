import { addExternalUsers } from '../actions/externalUsers'

export function subscriptions(socket, props) {
  socket.on('user', user => {
    props.dispatch(addExternalUsers(user))
  })

  socket.on('commenceVote', () => {
    //dispatch to switch to vote screen and use saved externalUsers to display a list of people to vote for
  })

  socket.on('voteResult', result => {
    console.log('voteResult:', result)
  })

  socket.on('gameOver', () => {
    if(props.localUser.role === 'Alien') {
      socket.emit('alienHistory', props.localUser.tasks)
    }
  })

}
