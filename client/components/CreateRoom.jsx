import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'
// import Logo from "./download.jpeg"

// import 'styles.scss';

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
        <h1 className="heading">Start a game!</h1>
        {/* <img src={Logo} /> */}
        <div className="display">
          <h2 className="header">Room Code: {this.state.room}</h2>
          <form className="text" id="Create" onSubmit={this.handleSubmit}>

            <input type="text" placeholder='Enter a name' onChange={this.handleChange} className="input" />
            <div className="btn-bar">
              <input type="submit" value="Create Loby" className="buttonClick" />
              <button className="buttonClick" onClick={this.handleClick}>Go Back</button>
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
