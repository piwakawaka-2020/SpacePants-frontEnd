import React from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import TransitionContainer from './TransitionContainer'

import { connect } from 'react-redux'

class GameRoom extends React.Component {

  state = {
    task: '',
    hint: '',
    disabled: false,
    time: '5:00',
    screen: 'Comms',
    voteActive: false,
    voteData: {
      castVote: false,
      receiveVote: false,
      vote: '',
      voter: ''
    },
    result: ''
  }

  componentDidMount() {
    this.props.socket.on('timer', time => {
      this.setState({
        time
      })

      const seconds = Number(time.split(':')[1])
      if ((seconds + 10) % 30 === 0 && this.props.localUser.role == 'Human') {
        this.props.socket.emit('getBadHint')
      }
    })

    this.props.socket.on('receiveVote', voteData => {
      this.setState({
        screen: 'Votes',
        voteActive: true,
        voteData: {
          castVote: false,
          receiveVote: true,
          voter: voteData.voter,
          vote: voteData.vote
        }
      })
    })

    this.props.socket.on('voteFailed', () => {
      this.setState({
        screen: 'Comms',
        voteActive: false,
        voteData: {
          castVote: false,
          receiveVote: false,
          vote: '',
          voter: ''
        },
      })
    })

    this.props.socket.on('gameOver', ({ winner }) => {
      if (this.props.localUser.role === 'Alien') {
        this.props.socket.emit('alienHistory', {
          tasks: this.props.localUser.tasks,
          winner: winner,
          room: this.props.localUser.room
        })
      } x
    })

    this.props.socket.on('finalScreen', endData => {
      this.props.socket.removeAllListeners()

      this.props.history.replace({
        pathname: '/end',
        state: {
          taskList: endData.tasks,
          winner: endData.winner,
          time: this.state.time
        }
      })
    })
  }

  handleVote = e => {
    this.setState(prevState => ({
      voteActive: !this.state.voteActive,
      screen: this.state.screen === 'Comms' ? 'Votes' : 'Comms',
      voteData: {
        ...prevState.voteData,
        castVote: true
      }
    }))
  }

  render() {
    return (
      <>
        <h1 className="header">You are {this.props.localUser.role}</h1>
        <span>
          <p className="time">{this.state.time}</p>
          {
            this.props.localUser.role === 'Alien' &&
            <p>Tasks Completed: {this.props.localUser.completedTasks}</p>
          }
        </span>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={this.state.voteActive}
            addEndListener={(node, done) => { node.addEventListener("transitionend", done, false) }}
            classNames="slide">

            <TransitionContainer screen={this.state.screen} voteData={this.state.voteData} handleVote={this.handleVote} />

          </CSSTransition>
        </SwitchTransition>


        <button className='callVoteBtn' onClick={this.handleVote} disabled={!this.props.localUser.vote}>Vote</button>
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

export default connect(mapStateToProps)(GameRoom)