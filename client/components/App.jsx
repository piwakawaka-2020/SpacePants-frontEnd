import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import io from 'socket.io-client'
import { connect } from 'react-redux'

import { createUser } from '../actions/localUser'
import WaitingRoom from './WaitingRoom'

import LandingPage from './LandingPage'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Voting from './Voting'
import GameRoom from './GameRoom'

import {subscriptions} from '../apis/socket'


const socket = io('http://localhost:3000')


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(createUser(socket))

    subscriptions(socket, this.props)
  }

  render() {
    return (
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route path='/waiting' component={WaitingRoom} />
        <Route path='/create' component={CreateRoom} />
        <Route path='/join' component={JoinRoom} />
        <Route path='/vote' component={Voting} />
        
        <Route path='/game' component={GameRoom} />
      </Router>
    )
  }
}

export default connect()(App)
