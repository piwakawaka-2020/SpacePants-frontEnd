import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {

  componentDidMount() {
      let code = []

      while(code.length < 4) {
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
      <div className="page">
        <h1 className="heading">{this.state.room}</h1>
        <form className="text" id="Create" onSubmit={this.handleSubmit}>
          <div className="btns">
          <label>
            Enter Your Name:
          </label>
          <input type="text"placeholder='Name' onChange={this.handleChange} name="name" />
          <input type="submit" className='positive-btn' value="submit"/>
          <br />
          <button className="negative-btn" onClick={this.handleClick}>Click to go Back</button>
          </div>
        </form>
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

export default connect(mapStateToProps)(CreateRoom)
