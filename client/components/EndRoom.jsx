import React from 'react'

import { connect } from 'react-redux'

import { resetState } from '../actions/localUser'

class EndRoom extends React.Component {

  state = {
    users: [],
    time: "",
    alienHistory: []
  }

  componentDidMount() {
    this.props.socket.on('playAgain', () => {
      this.props.dispatch(resetState())
      this.props.history.replace('/waiting')
    })
  }

  playAgain = e => {
    this.props.socket.emit('playAgain')
  }

  render() {

    return (
        <>
          <h3 className='header'>The winner is...</h3>
          {/*<h1>{this.props.location.state.winner}!</h1>*/}
          <h1 className='fancy-header'>Alien!</h1>

          {/*<div><h3>Final Time: {this.props.location.state.time}</h3></div>*/}
        
          <div><h3>Time Remaining: 1:15</h3></div>

          <div className='end-display'>
            <p><strong>The alien completed these tasks-</strong></p>
            <div>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
              <p className='task completed'>This is a task that the Alien completed - complete</p>
              <p className='task skipped'>The Alien decided to skip this task - skipped</p>
            </div>
           
            {/* {
              this.props.location.state.taskList.map((task, i) => {
                console.log(task)
                if (task.complete == true) {
                  let taskStyle = {
                    color: 'slategrey'
                  }
                  return <p key={i} style={taskStyle}>{task.task} - complete</p>
                } 
                if(task.complete == false) {
                  let taskStyle = {
                    color: 'red'
                  }
                  return <p key={i} style={taskStyle}>{task.task} - skipped</p>
                }
              })
            } */}
          </div >

          <div>
            <p className='text'>{this.state.time}</p>
          </div >
          <button className='button' onClick={() => this.props.history.push('/waiting')
          }> Another game ?</button >
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