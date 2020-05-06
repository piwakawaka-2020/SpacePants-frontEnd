import React from 'react'

import { connect } from 'react-redux'

class WaitingRoom extends React.Component {

  // componentDidMount() {
  //   socket.
  // }

  startGame = e = {
    //start game here
  }

  render() {
    return (
      <div>
        {
          this.props.users.map(user => {
            return (<p>user.name</p>)
          })
        }

        <button onClick={this.startGame} />
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.users[0].socket,
    users: globalState.users
  }
}

export default connect(mapStateToProps)(WaitingRoom)