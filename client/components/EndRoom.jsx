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
      <div className='align' >
        <div>
          <h3 className='heading'>The winner is...</h3>
          <h1>{this.props.location.state.winner}!</h1>
        </div >

        <div><h3>Final Time: {this.props.location.state.time}</h3></div>

        <div>
          <h2 className='text'>The alien completed these tasks-</h2>
          {
            this.props.location.state.taskList.map(task => {
              if (task.complete == true) {
                let taskStyle = {
                  color: 'green'
                }
                return <p style={taskStyle}>{task.task} - complete</p>
              } else {
                let taskStyle = {
                  color: 'red'
                }
                return <p style={taskStyle}>{task.task} - skipped</p>
              }
            })
          }
        </div >

        <div>
          <p className='text'>{this.state.time}</p>
        </div >
        <button className='button' onClick={() => this.props.history.push('/waiting')
        }> Another game ?</button >
      </div >
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