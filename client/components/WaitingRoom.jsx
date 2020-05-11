import React from 'react'

import { connect } from 'react-redux'
import { addRole } from '../actions/localUser'

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

  render() {

    return (
      <div className="align" id='join'>
        <p className="heading" id='roomBox'>Room Code: </p>
        <div className='align' id='oval'>{this.props.room}</div>
        <div id='box'></div>
          
          <div id='userbox'>
        {
          this.props.users.map((user, i) => {
            return (<p  className="text" key={i} class='user'>{user}</p>)
          })
        }
      
        </div>
        <button className="button" id='start' onClick={this.startGame} disabled={this.props.users.length < 1}>Start Game</button>
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