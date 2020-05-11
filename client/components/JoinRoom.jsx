import React from 'react'

import { connect } from 'react-redux'
import { joinRoom } from '../actions/localUser'

class JoinRoom extends React.Component {

  componentDidMount() {
    this.props.socket.on('usersWaiting', userArr => {
      if (userArr.includes(this.state.name)) {
        this.setState({ usernameTaken: true })
        return
      } else {

        const userData = {
          name: this.state.name,
          room: this.state.room,
        }
        this.props.dispatch(joinRoom(userData, this.props.socket))
        this.props.history.replace('/waiting')
      }
    })

    this.props.socket.on('roomList', roomList => {
      if (roomList.includes(this.state.room) && this.state.name.match(/\w/)) {
        this.setState({ disableSubmit: false })
      } else {
        this.setState({ disableSubmit: true })
      }
    })
  }

  state = {
    name: '',
    room: '',
    usernameTaken: false,
    disableSubmit: true
  }

  handleChange = e => {

    this.setState({
      usernameTaken: false,
      [e.target.name]: e.target.name === 'room' ? e.target.value.toUpperCase() : e.target.value
    }, () => {
      if (this.state.room.length == 4) {
        this.props.socket.emit('getRoomList')
      } else {
        this.setState({ disableSubmit: true })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.socket.emit('checkUsers', this.state.room)
  }

  handleClick = (e) => {
    this.props.history.replace('/')
  }
  render() {
    return (
      <>

        <div className="align">
          <h1 className="heading">Join a game!</h1>
          <div className="text">
            <form id="roomJoin" onSubmit={this.handleSubmit}>
              <label>Enter Name: </label>
              <input type="text" name="name" placeholder='Name' value={this.state.name} maxLength='20' onChange={this.handleChange} />
              <label>Room Id: </label>
              <input type="text" name="room" placeholder='Room code' value={this.state.room} maxLength="4" onChange={this.handleChange} />
              <input type="submit" value="submit" disabled={this.state.disableSubmit} />
            </form>
          </div>
          {this.state.usernameTaken && <p className="tipText">{this.state.name} is already in this room. Enter a new name and try again.</p>}

        </div>
      </>
    )
  }
}

const mapStateToProps = (globalState) => {
  return {
    socket: globalState.localUser.socket
  }
}

export default connect(mapStateToProps)(JoinRoom)