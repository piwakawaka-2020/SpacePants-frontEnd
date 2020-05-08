import React from 'react'

import { connect } from 'react-redux'

class EndRoom extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    
    }
  
  render() {

    return (
      <>
            <div>
                <h1>The winner is -</h1>
                {/* WINNER NAME */}
            </div>

            <div>
                <h2>The alien completed these tasks-</h2>
                {/* <ul>ALIEN TASKS GO HERE</ul> */}
            </div>

        <button onClick={() => this.props.history.push('/waiting')}>Another game?</button>
      </>
    )
  }
}

function mapStateToProps(globalState) {

  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
  }
}

export default connect(mapStateToProps)(EndRoom)