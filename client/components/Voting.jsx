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
      vote: vote ? 'Affirmative' : 'Negative',
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
      <div className='container'>
        <div className='voteScreen'>
          {
            this.props.castVote &&
            <>
              <h2>Who do you accuse?</h2>
              {this.props.users.map((user, index) => {
                if (user != this.props.localUser.name) {
                  return (
                    <div className='voteContainer' key={index}>
                      <button className='accuseBtn' onClick={this.handleVote} name={user} key={index}>{user}</button>
                    </div>
                  )
                }
              })
              }
            </>
          }
          {
            this.props.receiveVote &&
            <div>
              {this.props.voter === this.props.localUser.name ?
                <div className='accuseTextContainer'>
                  <h2>You accused <strong>{this.props.vote}</strong> of being an <strong>{'\u{1F47D}'}</strong></h2>
                  <p>Who will agree with you?</p>
                </div>
                :
                <div className='accuseBtnContainer'>

                  <h2><strong>{this.props.voter}</strong> thinks <strong>{this.props.vote}</strong> is an <strong>{'\u{1F47D}'}</strong> How shall we proceed?</h2>
                  {!this.state.cast ?
                    <>
                      <button id='agree' onClick={() => this.sendVote(true)}>Alien Autopsy!</button>
                      <button id='disagree' onClick={() => this.sendVote(false)}>{this.props.vote} is a human!</button>
                    </>
                    :
                    <h2>Vote Cast!</h2>
                  }
                </div>
              }
            </div>
          }
        </div>
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