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
        navigator.vibrate([250])

        this.props.dispatch(receiveTask(task))

        this.setState({
          task: this.props.localUser.tasks[0].task,
          disabled: false
        });
      })

      if (this.state.task == '') {
        this.props.socket.emit('getTask')
      }

    } else {
      this.props.socket.on('hint', hint => {
        navigator.vibrate([250])
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
    let [minutes, seconds] = this.props.time.split(':')

    if (Number(seconds) < 30 && minutes == '0') {
      this.setState({
        task: 'No more submissions needed!  You have successfully integrated into human culture.  Surely they won\'t discover you in the final few seconds...'
      })
    } else {
      this.props.dispatch(completeTask(this.props.socket, this.props.room))
    }
  }

  render() {
    return (
      <>
        <div className='commsDisplay'>

          {
            this.props.localUser.role === 'Alien' &&
            <>
              <span>
                <p><strong>Active Behaviour Directive:</strong></p>
                <p>{this.state.task}</p>
              </span>

              <span className='btn-bar'>
                <button className='negative-btn' onClick={this.handleSkip} disabled={this.state.disabled}>Skip</button>
                <button className='positive-btn' onClick={this.handleComplete} disabled={this.state.disabled}>Complete</button>
              </span>
            </>
          }

          {
            this.props.localUser.role === 'Human' &&
            <>
              <div className='hint-list'>
                <p><strong>Latest B.O.S.S Communications:</strong></p>
                {
                  this.props.localUser.hints.map((hint, i) => {
                    return <p key={i}>{hint}</p>
                  })
                }
              </div>
            </>
          }
        </div>
      </>
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

export default connect(mapStateToProps)(Comms)