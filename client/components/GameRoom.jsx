import React from 'react'
import Voting from './Voting'

import { connect } from 'react-redux'
import { completeTask, receiveTask, receiveHint, checkVoteResult} from '../actions/localUser'

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
    },
    result: ''
  }

  componentDidMount() {
    this.props.socket.on('timer', time => {
      this.setState({
        time
      })

      if (time === '0:00') {
        this.props.history.replace('/end')
      }

      const seconds = Number(time.split(':')[1])
      if ((seconds + 10) % 30 === 0 && this.props.localUser.role == 'Human') {
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

    this.props.socket.on('voteResult', result =>{
      this.setState({
        result: result
      })

      const resultData = {
        result: this.state.result,
        room: this.props.room
      }
      this.props.socket.emit('checkResult', resultData)
      console.log('result from state: ', this.state.result)
      this.props.dispatch(checkVoteResult(this.state.result))
    })

    if(this.state.result === false){
      this.setDefault()
    }
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

  setDefault = () =>{
    this.setState({
      voteData: {
        castVote: false,
        receiveVote: false,
        vote: '',
        voter: ''
      },
    })
    console.log(this.state.voteData)
  }

  render() {
    return (
      <div className="align">
        <h1 className="heading">You are {this.props.localUser.role}</h1>

        <p className="heading">{this.state.time}</p>

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
      </div >
    )
  }
}

function mapStateToProps(globalState) {
  console.log(globalState)
  return {
    socket: globalState.localUser.socket,
    localUser: globalState.localUser,
    room: globalState.localUser.room
  }
}

export default connect(mapStateToProps)(GameRoom)