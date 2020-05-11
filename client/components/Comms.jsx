import React from 'react'
import { connect } from 'react-redux'

import { receiveHint, receiveTask, completeTask } from '../actions/localUser'

class Comms extends React.Component {

  state = {
    task: '',
    disabled: false
  }

  componentDidMount() {
    if (this.props.localUser.role === 'Alien') {
      this.props.socket.on('task', task => {
        this.props.dispatch(receiveTask(task))

        this.setState({
          task: this.props.localUser.tasks[0].task,
          disabled: false
        });
      })

      if(this.state.task == '') {
        this.props.socket.emit('getTask')
      }

    } else {
      this.props.socket.on('hint', hint => {
        this.props.dispatch(receiveHint(hint))
        this.setState({ hint: this.props.localUser.hint });
      })
    }
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners('hint')
    this.props.socket.removeAllListeners('task')
  }

  handleSkip = e => {
    this.setState({
      task: 'The humans are on to you!  Do nothing for 30 seconds!',
      disabled: true
    })
    this.props.socket.emit('skipTask')
  }

  handleComplete = e => {
    this.props.dispatch(completeTask(this.props.socket, this.props.room))
  }

  render() {
    return (
      <div className='display'>
        {
          this.props.localUser.role === 'Alien' &&
          <>
            <span>
              <p><strong>Active Behaviour Directive:</strong></p>
              <p>{this.state.task}</p>
            </span>

            <span className='btn-bar'>
              <button onClick={this.handleSkip} disabled={this.state.disabled}>Skip</button>
              <button onClick={this.handleComplete} disabled={this.state.disabled}>Complete</button>
            </span>

            <p>Number of Tasks completed: {this.props.localUser.completedTasks}</p>
          </>
        }

        {
          this.props.localUser.role === 'Human' &&
          <div className='display'>
            <p><strong>Latest B.O.S.S Communication:</strong></p>
            <p>{this.props.localUser.hint}</p>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    localUser: globalState.localUser
  }
}

export default connect(mapStateToProps)(Comms)