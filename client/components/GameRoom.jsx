import React from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import TransitionContainer from './TransitionContainer'
import VoteResultModal from './VoteResultModal'
import { resetState } from '../actions/localUser'

class GameRoom extends React.Component {

  state = {
    task: '',
    hint: '',
    time: '5:00',
    screen: 'Comms',
    voteActive: false,
    disableVote: false,
    voteData: {
      castVote: false,
      receiveVote: false,
      vote: '',
      voter: ''
    },
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

    this.props.socket.on('disableVote', () => {
      this.setState({
        disableVote: true
      })
    })

    this.props.socket.on('receiveVote', voteData => {
      navigator.vibrate([250])
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
        showModal: true,
      })

      setTimeout(() => {
        this.closeModal()
      }, 3000)
    })

    this.props.socket.on('gameOver', ({ winner }) => {
      if (this.props.localUser.role === 'Alien') {
        this.props.socket.emit('alienHistory', {
          tasks: this.props.localUser.tasks,
          winner: winner,
          room: this.props.localUser.room
        })
      }
    })

    this.props.socket.on('finalScreen', endData => {
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

  componentWillUnmount() {
    const callbacks = Object.keys(this.props.socket._callbacks)
    callbacks.forEach(el => {
      if (el != '$user') {
        this.props.socket.removeAllListeners(el.substr(1))
      }
    });

    this.props.socket.on('playAgain', () => {
      this.props.dispatch(resetState())
      this.props.history.replace('/waiting')
    })
  }

  handleVote = e => {
    this.props.socket.emit('disableVote')
    this.setState(prevState => ({
      voteActive: !this.state.voteActive,
      screen: this.state.screen === 'Comms' ? 'Votes' : 'Comms',
      voteData: {
        ...prevState.voteData,
        castVote: true
      }
    }))
  }

  closeModal = e => {
    this.setState({
      showModal: false,
      screen: 'Comms',
      voteActive: false,
      disableVote: false,
      voteData: {
        castVote: false,
        receiveVote: false,
        vote: '',
        voter: ''
      },
    })
  }

  render() {
    return (
      <>
        <h1 className="fancyHeader">You are {this.props.localUser.role}</h1>
        <span className='time-container'>
          <p className="time">{this.state.time}</p>
          {
            this.props.localUser.role === 'Alien' &&
            <p className='tagline'>Tasks Completed: {this.props.localUser.completedTasks}</p>
          }
        </span>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={this.state.voteActive}
            addEndListener={(node, done) => { node.addEventListener("transitionend", done, false) }}
            classNames="slide">

            <TransitionContainer screen={this.state.screen} voteData={this.state.voteData} handleVote={this.handleVote} time={this.state.time} />

          </CSSTransition>
        </SwitchTransition>


        <button className='fancy-btn' onClick={this.handleVote} disabled={!this.props.localUser.vote || this.state.disableVote}>Vote</button>

        <VoteResultModal showModal={this.state.showModal} closeModal={this.closeModal} />
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