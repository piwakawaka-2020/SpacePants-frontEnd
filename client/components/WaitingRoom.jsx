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
        {/* {
          this.props.users.map(user => {
            return (<p>{user.name}</p>)
          })
        } */}

        <button onClick={this.startGame} />
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    users: globalState.users
  }
}

export default connect(mapStateToProps)(WaitingRoom)