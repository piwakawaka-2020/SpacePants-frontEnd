import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {

  componentDidMount() {
    const socket = this.props.socket
    socket.emit('getRoomList')
    const roomList = socket.on('roomList', rooms => rooms) //get room list
    
    generateRoomCode = () => {    
      let code = []
      while(code.length < 4) {
        var rand = Math.floor(65 + Math.random() * (90 - 65));
        code.push(String.fromCharCode(rand))
      }
      return code.join('')
    }

    let roomCode = () => {
      let room = this.generateRoomCode()
      if (roomList.includes(room)){roomCode()} //if room already exists run the function again to get a new random code.
      else {return room}
    }
    
    this.setState({
      room: roomCode
    })
  }

  state = {
    name: "",
    room: ''
  }

  
  handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      name: this.state.name,
      room: this.state.room
    }
  
    this.props.dispatch(joinRoom(userData, this.props.socket))
    this.props.history.replace('/waiting')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div class="align">
        <h1 class="heading">{this.state.room}</h1>

        <form class="text" id="Create" onSubmit={this.handleSubmit}>
          <label>
            Name:
          </label>
          <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (globalState) => {
  return {
    socket: globalState.localUser.socket

  }
}

export default connect(mapStateToProps)(CreateRoom)
