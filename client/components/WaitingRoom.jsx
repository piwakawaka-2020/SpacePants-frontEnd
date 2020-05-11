import React from 'react'

import { connect } from 'react-redux'
import { addRole } from '../actions/localUser'


//random user colours
function colour() {
  const col = Math.random()
  if (col < 0.33) {
    return 'purple'
  } else if(col < 0.66) {
    return 'blue'
  } else {
    return 'pink'
  }
}

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

  startGame = e => {
    this.props.socket.emit('startGame', this.props.room)
  }

  leaveGame = e => {
    this.props.socket.emit('leaveRoom', this.props.room)
    this.props.history.replace('/')
  }
  
  



  render() {

    return (
      <div className="align">
        <div className='ufo'>
        <p className="heading" className='ufoTop'>Room Code: </p>
        <div className='ufoBottom'>{this.props.room}</div>
        </div>
        <div className='usersList'>
        
        {
          this.props.users.map((user, i) => {
            return (<p  className="text" className='userSingle' className={colour()} key={i}>{user}</p>)
          })
        }
        </div>
        <button className="button" className='startBtn' onClick={this.startGame} disabled={this.props.users.length < 1}>Start Game</button>
        <button onClick={this.leaveGame} className='leaveBtn'>Leave Game</button>
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers,
    room: globalState.localUser.room
  }
}

export default connect(mapStateToProps)(WaitingRoom)