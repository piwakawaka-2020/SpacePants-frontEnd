import React from 'react'

import { connect } from 'react-redux'
import { joinRoom } from '../actions/localUser'

class JoinRoom extends React.Component {

  state = {
    name: '',
    room: '',
    roomList: [],
    disableSubmit: true
  }

  handleChange = e => {
    const socket = this.props.socket
    socket.emit('getRoomList')
    socket.on('roomList', room => this.setState({roomList: room})) //get room lis

    this.setState({
      [e.target.name]: e.target.name === 'room' ? e.target.value.toUpperCase() : e.target.value
    },

    () => {
      let room = this.state.room
      let roomList = this.state.roomList
      
      if (roomList.includes(room)){
      this.setState({disableSubmit: false})
    } else this.setState({disableSubmit: true})}
    )
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
      <div className="align">
        <h1 className="heading">Join a game!</h1>
        <div className="text">
          <form id="roomJoin" onSubmit={this.handleSubmit}>
            <label>Enter Name: </label>
            <input type="text" name="name" placeholder='Name' value={this.state.name} maxLength='20' onChange={this.handleChange} />
            <label>Room Id: </label>
            <input type="text" name="room" placeholder='Room code' value={this.state.room} maxLength="4" onChange={this.handleChange} />
            <input type="submit" value="submit" disabled={this.state.disableSubmit}/>
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