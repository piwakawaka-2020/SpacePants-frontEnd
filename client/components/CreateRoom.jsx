import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {

  componentDidMount() {
    const socket = this.props.socket
    socket.emit('getRoomList')
    const roomList = socket.on('roomList', rooms => rooms)
    var min = 1;
    var max = 100;
    var rand = () => {min + Math.ceil((Math.random() * (max - min)))}
    

    this.setState({
      room: rand
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
      <>
        <h1>{this.state.room}</h1>

        <form id="Create" onSubmit={this.handleSubmit}>
          <label>
            Name:
          </label>
          <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
          <input type="submit" value="submit" />
        </form>
      </>
    )
  }
}

const mapStateToProps = (globalState) => {
  return {
    socket: globalState.localUser.socket

  }
}

export default connect(mapStateToProps)(CreateRoom)
