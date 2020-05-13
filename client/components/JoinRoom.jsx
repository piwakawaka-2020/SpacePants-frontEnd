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

  componentWillUnmount() {
    this.props.socket.removeAllListeners('roomList')
    this.props.socket.removeAllListeners('usersWaiting')
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
        <h1 className="header">Join a Game</h1>
        <form className='formDisplay' onSubmit={this.handleSubmit}>
          <span>
            <label>Enter Name: </label>
            <input type="text" name="name" value={this.state.name} maxLength='20' onChange={this.handleChange} />
          </span>
          <span>
            <label>Room Code: </label>
            <input type="text" name="room" value={this.state.room} maxLength="4" onChange={this.handleChange} />
          </span>
          <div className='btn-bar'>
            <button className="negative-btn" onClick={this.handleClick}>Return</button>
            <input className='positive-btn' type="submit" value="Join" disabled={this.state.disableSubmit} />
          </div>
        </form>
        {this.state.usernameTaken && <p className="tipText">{this.state.name} is already in this room. Enter a new name and try again.</p>}
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