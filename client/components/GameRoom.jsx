import React from 'react'

import { connect } from 'react-redux'
import { doVote, doSkip, doComplete, receiveTask, receiveHint } from '../actions/localUser'

class GameRoom extends React.Component {

  state = {
    task: '',
    hint: 'No leads received yet',
    disabled: false,
    time: '5:00'
  }

  componentDidMount() {
    this.props.socket.on('timer', time => {
      this.setState({
        time
      })

      const seconds = Number(time.split(':')[1])
      if (seconds % 30 === 0 && this.props.localUser.role == 'Human') {
        this.props.socket.emit('getFakeHint')
      }
    })

    if (this.props.localUser.role === 'Alien') {
      this.props.socket.on('task', task => {
        this.props.dispatch(receiveTask(task))

        this.setState({
          task: this.props.localUser.tasks[0].task,
          disabled: false
        });
      })
      this.props.socket.emit('getTask')

    } else {
      this.props.socket.on('hint', hint => {
        this.props.dispatch(receiveHint(hint))
        this.setState({ hint: this.props.localUser.hint });
      })
    }
  }

  handleVote = e => {
    this.props.dispatch(doVote())
    //switch to vote
  }

  handleSkip = e => {
    this.setState({
      task: 'The humans are on to you!  Do nothing for 30 seconds!',
      disabled: true
    })
    this.props.dispatch(doSkip(this.props.socket))
  }

  handleComplete = e => {
    this.setState({
      task: 'Waiting for next task...',
      disabled: true
    })
    this.props.dispatch(doComplete(this.props.socket, this.props.room))
  }

  render() {
    return (
      <div class="align">
        <h1 class="heading">You are {this.props.localUser.role}</h1>

        <p class="heading">{this.state.time}</p>

        {/* Alien screen */}
        {
          this.props.localUser.role === 'Alien' &&
          <div class="btton">
            <p class="text">{this.state.task}</p>
            <button onClick={this.handleSkip} disabled={this.state.disabled}>skip</button>
            <button onClick={this.handleComplete} disabled={this.state.disabled}>complete</button>
            <p class="text">Number of Tasks completed: {this.props.localUser.completedTasks}</p>
          </div>
        }

        {/* Human screen */}
        {
          this.props.localUser.role === 'Human' &&
          <div>
            <p class="text">{this.state.hint}</p>
          </div>
        }

        <button class="button" onClick={this.handleVote}>Vote!</button>

      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    localUser: globalState.localUser,
    room: globalState.localUser.room
  }
}

export default connect(mapStateToProps)(GameRoom)