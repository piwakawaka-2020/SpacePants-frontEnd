import React from 'react'
import Voting from './Voting'

import { connect } from 'react-redux'
import { doComplete, receiveTask, receiveHint } from '../actions/localUser'

class GameRoom extends React.Component {

  state = {
    task: '',
    hint: 'No leads received yet',
    disabled: false,
    time: '5:00',
    voteData: {
      castVote: false,
      receiveVote: false,
      vote: '',
      voter: ''
    }
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

    this.props.socket.on('receiveVote', voteData => {
      this.setState({
        voteData: {
          castVote: false,
          receiveVote: true,
          voter: voteData.voter,
          vote: voteData.vote
        }
      })
    })
  }

  handleVote = e => {
    this.setState(prevState => ({
      voteData: {
        ...prevState.voteData,
        castVote: true
      }
    }))
  }

  handleSkip = e => {
    this.setState({
      task: 'The humans are on to you!  Do nothing for 30 seconds!',
      disabled: true
    })
    this.props.socket.emit('skipTask')
  }

  handleComplete = e => {
    this.setState({
      task: 'Waiting for next task...',
      disabled: true
    })
    this.props.dispatch(completeTask(this.props.socket, this.props.room))
  }

  render() {
    return (
      <div class="align">
        <h1 class="heading">You are {this.props.localUser.role}</h1>

        <p class="heading">{this.state.time}</p>

        {
          !this.state.voteData.receiveVote &&
          <>

            {/* Alien screen */}
            {
              this.props.localUser.role === 'Alien' &&
              <div>
                <p>{this.state.task}</p>
                <button onClick={this.handleSkip} disabled={this.state.disabled}>skip</button>
                <button onClick={this.handleComplete} disabled={this.state.disabled}>complete</button>
                <p>Number of Tasks completed: {this.props.localUser.completedTasks}</p>
              </div>
            }

            {/* Human screen */}
            {
              this.props.localUser.role === 'Human' &&
              <div>
                <p>{this.state.hint}</p>
              </div>
            }
            
            <button onClick={this.handleVote} disabled={!this.props.localUser.vote}>Vote</button>
          </>
        }

        <Voting {...this.state.voteData} />
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