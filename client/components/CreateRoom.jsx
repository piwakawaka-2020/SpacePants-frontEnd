import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {

  componentDidMount() {
    let code = []

    while (code.length < 4) {
      var rand = Math.floor(65 + Math.random() * (90 - 65));
      code.push(String.fromCharCode(rand))
    }

    this.setState({
      room: code.join('')
    })
  }

  state = {
    name: '',
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

  handleClick = (e) => {
    this.props.history.replace('/')
  }

  render() {
    return (
      <>
        <span style={{ textAlign: 'center' }}>
          <h1 className="header">Create a Game</h1>
          <p>Room Code:</p>
          <h1 className="header">{this.state.room}</h1>
        </span>
        <form className="formDisplay" id="Create" onSubmit={this.handleSubmit} maxLength='15'>
          <span>
            <label>
              Enter Your Name:
            </label>
            <input type="text" onChange={this.handleChange} name="name" />
          </span>
          <div className='btn-bar'>
            <button className="negative-btn" onClick={this.handleClick}>Return</button>
            <input type="submit" className='positive-btn' value="Create" />
          </div>
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
