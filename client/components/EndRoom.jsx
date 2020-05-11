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
        <section className = "light">
          <h3 className='heading gradient1'>The winner is...</h3>
          {/*<h1>{this.props.location.state.winner}!</h1>*/}
          <h1 className='gradient2'>Alien!</h1>

        {/*<div><h3>Final Time: {this.props.location.state.time}</h3></div>*/}
        <div><h3>Final Time: 1:15</h3></div>


        <div>
          <h2 className='text'>The alien completed these tasks-</h2>
          <div className='tasklist'>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
            <p className='completedTask'>This is a task that the Alien completed - complete</p>
            <p className='skippedTask'>The Alien decided to skip this task - skipped</p>
          </div>
          {/* commented out for styling
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
        */}
        </div >

        <div>
          <p className='text'>this.state.time goes here</p>
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