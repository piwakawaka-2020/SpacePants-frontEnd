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
    room: '',
    category: 'local'
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name: this.state.name,
      room: this.state.room,
    }

    this.props.dispatch(joinRoom(userData, this.props.socket))
    this.props.socket.emit('setRoomCategory', this.state.category)
    this.props.history.replace('/waiting')
    this.props.socket.emit('preloadTasks')
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
          <p className='tagline'>Room Code:</p>
          <h1 className="header">{this.state.room}</h1>
        </span>

        <form className="formDisplay" style={{
          justifyContent: 'space-between'}} onSubmit={this.handleSubmit} maxLength='15'>
          <div>
            <span>
              <label>
                Enter Your Name:
            </label>
              <input type="text" onChange={this.handleChange} name="name" />
            </span>

            <span>
              <div className='toggle-container'>
                <span>
                  <input type='radio' name='category' id='local' value='local' onChange={this.handleChange} checked={this.state.category === 'local'} />
                  <label htmlFor='local'>Play Locally</label>
                </span>
                <span>
                  <input type='radio' name='category' id='remote' value='remote' onChange={this.handleChange} checked={this.state.category === 'remote'} />
                  <label htmlFor='remote'>Play Remotely</label>
                </span>
              </div>

              <div>
                {
                  this.state.category === 'local' &&
                  <p>The full experience.  Play the game with all available behaviour directives</p>
                }
                {
                  this.state.category === 'remote' &&
                  <p>For online play.  Use only tasks that are doable over the internet</p>
                }
              </div>
            </span>
          </div>

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
