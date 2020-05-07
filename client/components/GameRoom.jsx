import React from 'react'

import { connect } from 'react-redux'
import { doVote, doSkip, doComplete, receiveTask } from '../actions/localUser'

class GameRoom extends React.Component {

  componentDidMount() {
    if(this.props.user.role === 'Alien') {
      this.props.socket.on('tasks', task => {
        props.dispatch(receiveTask(task))
      })
      this.props.socket.emit('tasks')
      
    } else {
      socket.on('hint', hint => {
        props.dispatch(receiveHint(hint))
      })
    }
  }

  handleVote = e => {
    this.props.dispatch(doVote())
    //switch to vote
  }

  handleSkip = e => {
    this.props.dispatch(doSkip())
  }

  handleComplete = e => {
    this.props.dispatch(doComplete())
  }

  render() {
    
    return (
      <div>
        <h1>You are {this.props.user.role}</h1>

        {/* Timer goes here */}


        {/* Alien screen */}
        {
          this.props.user.role === 'Alien' &&
          <div>
           <p>{this.props.localUser.task}</p>
            <button onCick={this.handleSkip}>skip</button>
            <button onClick={this.handleComplete}>complete</button>
            <p>Number of Tasks completed: {this.props.localUser.completedTasks}</p>
          </div>
        }


        {/* Human screen */}
        {
          this.props.user.role ===  'Human' &&
          <div>
            <p>{this.props.localUser.hint}</p>
          </div>
        }


        <button onClick={this.handleVote}>Vote!</button>

      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    user: globalState.localUser,
  }
}

export default connect(mapStateToProps)(GameRoom)