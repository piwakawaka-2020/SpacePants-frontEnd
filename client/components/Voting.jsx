import React from 'react'
import { connect } from 'react-redux'
import {doVote} from '../actions/localUser'

class Voting extends React.Component {
  state = {
    voteFor: ''
  }

  handleVote = (event) =>{
    event.preventDefault()
    this.setState({
      voteFor: event.target.name
    })
    this.props.dispatch(doVote(this.state.voteFor, this.props.socket))
  }
  render() {
    return (
      <div>
        {
          (this.state.voteFor == '') ?
          <h1>Who do you think is the Alien?</h1> :
          <h1>You voted for {this.state.voteFor}</h1>
        }

        {
          (this.state.voteFor == '') && 
            this.props.users.map((user, index) => {
            return (
              <span key={index}>
                <button onClick={this.handleVote} name={user} key={index}>{user}</button>
              </span>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  console.log(globalState)
  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers
  }
}

export default connect(mapStateToProps)(Voting)