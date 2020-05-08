import React from 'react'
import { connect } from 'react-redux'
import { doVote } from '../actions/localUser'

class Voting extends React.Component {
  state = {
    voteFor: '',
    voteScreen: false
  }

  componentDidMount(){
    // subscribe voteCommence
    this.props.socket.on('receiveVote', voteData =>{
      
      this.setState({
        voteScreen: true,
        voter: voteData.voter,
        vote: voteData.vote 
      })
    })
  }

  handleVote = (event) =>{
    event.preventDefault()
    this.setState({
      voteFor: event.target.name
    }, () =>  {
      this.props.dispatch(doVote({
        voter: this.props.localUser.name,
        vote: this.state.voteFor
      }, this.props.socket))
    })
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

        {
          this.state.voteScreen &&
          <div>
            <h1>{this.state.voter} voted for {this.state.vote}</h1>
            <p>Do you agree?</p>
            <button>Yes</button>
            <button>No</button>
          </div>
        }

        {/* {
          (typeof this.state.voteFor == 'string') &&
            <div>
              <h3>Someone has voted for {this.state.voteFor}</h3>
              <button>Agree</button>
              <button>Disagree</button>
            </div>
        } */}
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  console.log(globalState)
  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
    localUser: globalState.localUser
  }
}

export default connect(mapStateToProps)(Voting)