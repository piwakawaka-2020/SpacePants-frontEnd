import React from 'react'
import { connect } from 'react-redux'
import { doVote } from '../actions/localUser'

class Voting extends React.Component {

  state = {
    vote: '',
    voteScreen: false
  }

  handleVote = (event) => {
    event.preventDefault()
    this.setState({
      vote: event.target.name
    }, () => {
      this.props.dispatch(doVote({
        voter: this.props.localUser.name,
        vote: this.state.vote,
        room: this.props.localUser.room
      }, this.props.socket))
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
                <h1>You voted for {this.props.vote}</h1>
                <p>Now you need to convince everyone else!</p>
              </>
              :
              <>
                <h1>{this.props.voter} voted for {this.props.vote}</h1>
                <p>Do you agree?</p>
                <button>Yes</button>
                <button>No</button>
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