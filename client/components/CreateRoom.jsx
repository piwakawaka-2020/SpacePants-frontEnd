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

  render() {
    return (
      <div className="align">
        <h1 className="heading">{this.state.room}</h1>
        <form className="text" id="Create" onSubmit={this.handleSubmit}>
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
