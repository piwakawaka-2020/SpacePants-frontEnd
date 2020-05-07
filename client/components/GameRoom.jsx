import React from 'react'

import { connect } from 'react-redux'
import { doVote, doSkip, doComplete } from '../actions/localUser'

class GameRoom extends React.Component {

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
    // if (this.props.vote == true){
    //     return <Vote/>
    // } else { do below}

    //task and hint display
    this.props.localUser.role == 'alien' && 
      //Alien display
      <div>
        <p>{this.props.localUser.task}</p>
        <button onCick={this.handleSkip}>skip</button>
        <button onClick={this.handleComplete}>complete</button>
        <p>Number of Tasks completed: {this.props.localUser.completedTasks}</p>
      </div>
   
    { this.props.localUser.role == 'human' &&
      //Human display
      <div>
        <p>{this.props.localUser.hint}</p>
      </div>
    }

    return (
      <div>
        <h1>you are a ${this.props.localUser.role}</h1>

        {display}

        <button onClick={this.handleVote}>Vote!</button>

      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    user: globalState.localUser,

  }
}

export default connect(mapStateToProps)(GameRoom)