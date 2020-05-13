import React from 'react'
import { connect } from 'react-redux'
import { useVote } from '../actions/localUser'

class Voting extends React.Component {

  state = {
    voteName: '',
    vote: '',
    cast: false
  }

  handleVote = (event) => {
    event.preventDefault()

    this.setState({
      voteName: event.target.name
    }, () => {
      this.props.dispatch(useVote())

      const voteData = {
        voter: this.props.localUser.name,
        vote: this.state.voteName,
      }

      let room = this.props.localUser.room

      this.props.socket.emit('triggerVote', { room, voteData })
      this.props.socket.emit('sendVote', { room, voteData: { motion: true, person: voteData.vote } })
    })
  }

  sendVote = vote => {
    this.setState({
      cast: true
    })

    let voteData = {
      motion: vote,
      person: this.props.vote
    }

    if (this.props.vote == this.props.localUser.name) {
      voteData.role = this.props.localUser.role
    }

    this.props.socket.emit('sendVote', {
      room: this.props.localUser.room,
      voteData
    })
  }

  render() {
    return (
      <div className='voteDisplay'>
        {
          this.props.castVote &&
          <>
            <h2>Who do you accuse?</h2>
            {this.props.users.map((user, i) => {
              if (user != this.props.localUser.name) {
                return (
                  <button key={i} className='accuse-btn' onClick={this.handleVote} name={user} key={i}>{user}</button>
                )
              }
            })
            }
          </>
        }
        {
          this.props.receiveVote &&
          <>
            {this.props.voter === this.props.localUser.name ?
              <>
                <h2>You accused <strong>{this.props.vote}</strong> of being an Alien!</h2>
                <p>Who will agree with you?</p>
              </>
              :
              <>
                <h2><strong>{this.props.voter}</strong> thinks <strong>{this.props.vote}</strong> is an Alien! How shall we proceed?</h2>
                {!this.state.cast ?
                  <div className='btn-bar'>
                    <button className='accuse-btn' onClick={() => this.sendVote(true)}>Alien Autopsy!</button>
                    <button className='accuse-btn' onClick={() => this.sendVote(false)}>{this.props.vote} is a human!</button>
                  </div>
                  :
                  <h2>Vote Cast!</h2>
                }
              </>
            }
          </>
        }
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
    localUser: globalState.localUser
  }
}

export default connect(mapStateToProps)(Voting)