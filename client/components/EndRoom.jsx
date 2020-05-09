import React from 'react'

import { connect } from 'react-redux'

class EndRoom extends React.Component {

  state = {
    users: [],
    time: "",
    alienHistory: []
  }

  render() {
    return (
      <div class='align'>
            <div>
                <h1 class='heading'>The winner is -</h1>
                {/* WINNER NAME */}
            </div>

            <div>
                <h2 class='text'>The alien completed these tasks-</h2>
                {/* <ul>ALIEN TASKS GO HERE</ul> */}
            </div>

            <div>
                <p class='text'>{this.state.time}</p>
            </div>
        <button class='button' onClick={() => this.props.history.push('/waiting')}>Another game?</button>
      </div>
    )
  }
}

function mapStateToProps(globalState) {

  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
    localUser: globalState.localUser
  }
}

export default connect(mapStateToProps)(EndRoom)