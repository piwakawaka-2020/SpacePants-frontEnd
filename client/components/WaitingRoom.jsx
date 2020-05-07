import React from 'react'

import { connect } from 'react-redux'

class WaitingRoom extends React.Component {

  state = {
    users: []
  }

  startGame = e => {
    console.log('start game')
    this.props.socket.emit('startGame', this.props.room)
    // this.props.history.replace('/game')
  }

  render() {

    return (
      <div>
        {
          this.props.users.map(user => {
            return (<p>{user}</p>)
          })
        }
        <button onClick={this.startGame} disabled={this.props.users.length < 4}>Start Game</button>
      </div>
    )
  }
}

function mapStateToProps(globalState) {

  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
    room: globalState.localUser.room
  }
}

export default connect(mapStateToProps)(WaitingRoom)