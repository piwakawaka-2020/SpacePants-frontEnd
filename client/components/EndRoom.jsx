import React from 'react'

import { connect } from 'react-redux'
import { addRole } from '../actions/localUser'

class WaitingRoom extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    
    }
  

  render() {

    return (
      <div>
        
        <button onClick={this.startGame} disabled={this.props.users.length < 4}>New Game</button>
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