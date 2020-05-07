import React from 'react'

import { connect } from 'react-redux'

class WaitingRoom extends React.Component {

  state = {
    users: []
  }

  startGame = e => {
    //start game here
  }

  render() {

    return (
      <div>
        
        {
          this.props.users.map(user => {
            return (<p>{user}</p>)
          })
        }

        <button onClick={this.startGame}>Start Game</button>
      </div>
    )
  }
}

function mapStateToProps(globalState) {

  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers
  }
}

export default connect(mapStateToProps)(WaitingRoom)