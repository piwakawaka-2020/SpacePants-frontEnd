import React from 'react'

import { connect } from 'react-redux'
import { joinRoom } from '../actions/localUser'

class JoinRoom extends React.Component {

  state = {
    name: '',
    room: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      name: this.state.name,
      room: this.state.room,
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
            <label>Enter Name: </label>
            <input type="text" name="name" placeholder='Name' value={this.state.name} maxLength='20' onChange={this.handleChange} />
            <label>Room Id: </label>
            <input type="text" name="room" placeholder='Room code' value={this.state.room} maxLength="4" onChange={this.handleChange} />
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