import React from 'react'

import { connect } from 'react-redux'
import { doVote, doSkip, doComplete, receiveTask } from '../actions/localUser'

class GameRoom extends React.Component {
  state = {
    task: ''
  }
  componentDidMount() {
    if(this.props.localUser.role === 'Alien') {
      this.props.socket.on('task', task => {
        this.props.dispatch(receiveTask(task))
        console.log('recieved task')
        this.setState({task: this.props.localUser.task});
      })
      this.props.socket.emit('task')
      
    } else {
      this.props.socket.on('hint', hint => {
        this.props.dispatch(receiveHint(hint))
      })
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.localUser.task !== this.props.localUser.task) {
  //     this.setState({task: this.props.localUser.task});
  //   }
  // }


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
    console.log('here is' + this.props.localUser.task)
    return (
      <div>
        <h1>You are {this.props.localUser.role}</h1>

        {/* Timer goes here */}


        {/* Alien screen */}
        {
          this.props.localUser.role === 'Alien' &&
          <div>
            {console.log(this.props.localUser)}
            <p>{this.state.task}</p>
            <button onClick={this.handleSkip}>skip</button>
            <button onClick={this.handleComplete}>complete</button>
            <p>Number of Tasks completed: {this.props.localUser.completedTasks}</p>
          </div>
        }


        {/* Human screen */}
        {
          this.props.localUser.role ===  'Human' &&
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
    localUser: globalState.localUser,
  }
}

export default connect(mapStateToProps)(GameRoom)