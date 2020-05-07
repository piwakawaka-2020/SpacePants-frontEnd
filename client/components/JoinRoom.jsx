import React from 'react'

import { connect } from 'react-redux'
import { joinRoom } from '../actions/localUser'

class JoinRoom extends React.Component {

  state = {
    name: 'Type Name',
    room: 'Type Room'
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      "name": this.state.name,
      "room": this.state.room,
    }

    this.props.dispatch(joinRoom(userData, this.props.socket))
    this.props.history.replace('/waiting')
  }

  render() {
    return (
      <div>
        <h1>Join a game!</h1>
        <div>
          <form id="roomJoin" onSubmit={this.handleSubmit}>
            <label>Enter your Name: </label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <label>Enter game Room Id: </label>
            <input type="text" name="room" value={this.state.room} onChange={this.handleChange} />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (globalState) => {
  return {
    socket: globalState.localUser.socket
  }
}


export default connect(mapStateToProps)(JoinRoom)