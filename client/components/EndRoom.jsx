import React from 'react'

import { connect } from 'react-redux'

import { resetState } from '../actions/localUser'

import { positiveClick, winnerSound } from '../../server/sound'

class EndRoom extends React.Component {

  state = {
    users: [],
    time: "",
    alienHistory: []
  }

  componentDidMount() {
    winnerSound.play()
    this.props.socket.on('playAgain', () => {
      this.props.dispatch(resetState())
      this.props.history.replace('/waiting')
    })
  }

  playAgain = e => {
    positiveClick.play()
    this.props.socket.emit('playAgain')
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
            (this.props.location.state.taskList.length == 1) ?

            <p>No task has been skipped or completed</p> :

            this.props.location.state.taskList.map((task, i) => {
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
          }
        </div >

        <div>
          <p className='text'>{this.state.time}</p>
        </div >
        <button className='button' onClick={this.playAgain}>Play Again</button >
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