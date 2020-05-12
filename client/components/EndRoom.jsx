import React from 'react'

import { connect } from 'react-redux'


class EndRoom extends React.Component {

  state = {
    users: [],
    time: "",
    alienHistory: []
  }

  playAgain = e => {
    this.props.socket.emit('playAgain')
  }

  render() {

    return (
      <>

        <h3 className='header'>The winner is...</h3>
        <h1 className='fancyHeader'>{this.props.location.state.winner}!</h1>

        <h3>Time Remaining: {this.props.location.state.time}</h3>

        <div className='commsDisplay'>
          <p><solid>The alien completed these tasks:</solid></p>
          {
            (this.props.location.state.taskList.length == 1) ?

              <p>No task has been skipped or completed</p> :

              this.props.location.state.taskList.map((task, i) => {
                return (
                  <div key={i} className='taskSummary'>
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