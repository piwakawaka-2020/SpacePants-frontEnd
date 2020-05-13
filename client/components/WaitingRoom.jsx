import React from 'react'

import { connect } from 'react-redux'
import { addRole, setPlayStatus } from '../actions/localUser'
import { positiveClick, negativeClick } from '../../server/sound'


//random user colours

class WaitingRoom extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    this.props.socket.on('role', role => {
      this.props.dispatch(addRole(role))
      this.props.history.replace('/game')
    })
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners('role')
  }

  colour() {
    const col = Math.random()
    if (col < 0.33) {
      return '#8858ac'
    } else if (col < 0.66) {
      return '#357baf'
    } else {
      return '#ba4385'
    }
  }

  startGame = e => {
    positiveClick.play()
    this.props.dispatch(setPlayStatus(true))
    this.props.socket.emit('startGame', this.props.room)
  }

  leaveGame = e => {
    negativeClick.play()
    this.props.socket.on('disconnect')
    this.props.socket.emit('leaveRoom', this.props.room)
    this.props.history.replace('/')
  }

  render() {

    return (
      <>

        <p className="header">Room Code: </p>
        <p className="header">{this.props.room}</p>
        <div className='usersDisplay'>

          {
            this.props.users.map((user, i) => {
              return (<p style={{ color: this.colour()}} key={i}>{user}</p>)
            })
          }

        </div>
        <div className='btn-bar'>
          <button onClick={this.leaveGame} className='negative-btn'>Leave Game</button>
          <button className="button" className='fancy-btn' onClick={this.startGame} disabled={this.props.users.length < 1}>Start Game</button>
        </div>
      </>
    )
  }
}

function mapStateToProps(globalState) {
  console.log(globalState)
  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
    room: globalState.localUser.room
  }
}

export default connect(mapStateToProps)(WaitingRoom)