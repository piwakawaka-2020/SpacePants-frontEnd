import React from 'react'
import { connect } from 'react-redux'
import { useVote } from '../actions/localUser'

class Voting extends React.Component {

  state = {
    voteName: '',
    vote: '',
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
        room: this.props.localUser.room
      }

      this.props.socket.emit('triggerVote', voteData)
      this.props.socket.emit('sendVote', { room: voteData.room, vote: true })
    })
  }

  sendVote = vote => {
    this.setState({
      vote: vote ? 'Affirmative' : 'Negative'
    })

    this.props.socket.emit('sendVote', {
      vote: vote,
      room: this.props.localUser.room
    })
  }

  render() {
    return (
      <div>
        {
          this.props.castVote &&
          <>
            <h1>Who do you think is the Alien?</h1>
            {this.props.users.map((user, index) => {
              return (
                <span key={index}>
                  <button onClick={this.handleVote} name={user} key={index}>{user}</button>
                </span>
              )
            })
            }
          </>
        }
        {
          this.props.receiveVote &&
          <div>
            {this.props.voter === this.props.localUser.name ?
              <>
                <h1>You accused <strong>{this.props.vote}</strong> of being an <strong>Alien!</strong></h1>
                <p>Who will agree with you?</p>
              </>
              :
              <>
                <h1><strong>{this.props.voter}</strong> thinks <strong>{this.props.vote}</strong> is an <strong>Alien!</strong> How shall we proceed?</h1>
                <h3>{this.state.vote}</h3>
                <button onClick={() => this.sendVote(true)}>Alien Autopsy!</button>
                <button onClick={() => this.sendVote(false)}>{this.props.vote} is a human!</button>
              </>
            }
          </div>
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