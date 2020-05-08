import React from 'react'

import { connect } from 'react-redux'
import { doVote, doSkip, doComplete, receiveTask, receiveHint } from '../actions/localUser'

class GameRoom extends React.Component {

  state = {
    task: '',
    hint: 'No leads recieved yet',
    disabled: 'false',
    time: ""
  }

  componentDidMount() {
    this.props.socket.on('timer', time => 
    this.setState({time}))

    if(this.props.localUser.role === 'Alien') {
      this.props.socket.on('task', task => {
        this.props.dispatch(receiveTask(task))
        console.log('recieved task')
        this.setState({
          task: this.props.localUser.task,
          disabled: 'false'
        });
      })
      this.props.socket.emit('getTask')
      
    } else {
      this.props.socket.on('hint', hint => {
        this.props.dispatch(receiveHint(hint))
        this.setState({hint: this.props.localUser.hint});
      })
    }
  }

  handleVote = e => {
    this.props.dispatch(doVote())
    //switch to vote
  }

  handleSkip = e => {
    this.setState({
      task: 'tasks are disabled for 30 seconds',
      disabled: 'true'
    })
    this.props.dispatch(doSkip())
  }

  handleComplete = e => {
    this.setState({
      task: 'waiting for next task...',
      disabled: 'true'
    })
    this.props.dispatch(doComplete(this.props.socket))
  }

  render() {
    return (
      <div>
        <h1>You are {this.props.localUser.role}</h1>

        <p>{this.state.time}</p>

        {/* Alien screen */}
        {
          this.props.localUser.role === 'Alien' &&
          <div>
            {console.log(this.props.localUser)}
            <p>{this.state.task}</p>
            <button onClick={this.handleSkip } disabled={this.state.disabled}>skip</button>
            <button onClick={this.handleComplete} disabled={this.state.disabled}>complete</button>
            <p>Number of Tasks completed: {this.props.localUser.completedTasks}</p>
          </div>
        }


        {/* Human screen */}
        {
          this.props.localUser.role ===  'Human' &&
          <div>
            <p>{this.state.hint}</p>
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
    localUser: globalState.localUser,
  }
}

export default connect(mapStateToProps)(GameRoom)