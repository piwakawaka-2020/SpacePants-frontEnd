import React from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import TransitionContainer from './TransitionContainer'
import VoteResultModal from './VoteResultModal'
import { resetState } from '../actions/localUser'

import { voteClick } from '../../server/sound'

class GameRoom extends React.Component {

  state = {
    task: '',
    hint: '',
    time: '5:00',
    voteScreenActive: false,
    disableVoteBtn: false,
    voteData: {
      hasCastVote: false,
      hasReceivedVote: false,
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
        disableVoteBtn: true
      })
    })

    this.props.socket.on('receiveVote', voteData => {
      navigator.vibrate([250])
      this.setState({
        voteScreenActive: true,
        voteData: {
          hasCastVote: false,
          hasReceivedVote: true,
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
      }, 2000)
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
    voteClick.play()
    this.props.socket.emit('disableVote')
    this.setState(prevState => ({
      voteScreenActive: true,
      voteData: {
        ...prevState.voteData,
        hasCastVote: true
      }
    }))
  }

  closeModal = e => {
    this.setState({
      showModal: false,
      voteScreenActive: false,
      disableVoteBtn: false,
      voteData: {
        hasCastVote: false,
        hasReceivedVote: false,
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
          <span className="timeUnderlay">8:88</span>
          <p className="time">{this.state.time}</p>
          {
            this.props.localUser.role === 'Alien' &&
            <p className='tagline'>Tasks Completed: {this.props.localUser.completedTasks}</p>
          }
        </span>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={this.state.voteScreenActive}
            addEndListener={(node, done) => { node.addEventListener("transitionend", done, false) }}
            classNames="slide">

            <TransitionContainer screen={this.state.voteScreenActive} voteData={this.state.voteData} handleVote={this.handleVote} time={this.state.time} />

          </CSSTransition>
        </SwitchTransition>


        <button className='fancy-btn' onClick={this.handleVote} disabled={!this.props.localUser.hasVote || this.state.disableVoteBtn}>Vote</button>

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