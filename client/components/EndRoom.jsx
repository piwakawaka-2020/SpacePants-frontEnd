import React from 'react'

import { connect } from 'react-redux'


class EndRoom extends React.Component {

  state = {
    users: [],
    time: "",
    alienHistory: []
  }

  playAgain = e => {
    let room = this.props.localUser.room
    this.props.socket.emit('playAgain', room)
  }

  render() {

    return (
      <>

        <p className='tagline'>The winner is...</p>
        <h1 className='fancyHeader'>{this.props.location.state.winner}!</h1>

        <p className='tagline'>Time Remaining: {this.props.location.state.time}</p>

        <div className='commsDisplay'>
          <p><strong>The alien completed these tasks:</strong></p>
          {
            (this.props.location.state.taskList.length == 1) ?

              <p>No tasks were completed</p> :

              this.props.location.state.taskList.map((task, i) => {
                return (
                  <div key={i} className='task-summary'>
                    <p>{task.task}</p>
                    <p
                      style={{ textAlign: 'center', color: task.complete ? '#357baf' : '#ba4385' }}>
                      {task.complete ? 'Complete' : 'Skipped'}
                    </p>
                  </div>
                )
              })
          }
        </div >

        <button className='fancy-btn' onClick={this.playAgain}>Play Again</button >
      </>
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