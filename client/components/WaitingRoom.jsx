import React from 'react'

import { connect } from 'react-redux'
import { addRole } from '../actions/localUser'

class WaitingRoom extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    this.props.socket.on('role', role => {
      this.props.dispatch(addRole(role))
      this.props.history.replace('/game')
    })
  }

  startGame = e => {
    this.props.socket.emit('startGame', this.props.room)
  }

  render() {

    return (
      <div>
        <p>Room Code: {this.props.room}</p>
        {
          this.props.users.map((user, i) => {
            return (<p key={i}>{user}</p>)
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