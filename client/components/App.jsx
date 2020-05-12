import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import io from 'socket.io-client'
import { connect } from 'react-redux'

import { createUser } from '../actions/localUser'
import {subscriptions} from '../apis/socket'

import LandingPage from './LandingPage'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'
import WaitingRoom from './WaitingRoom'
import GameRoom from './GameRoom'
import Voting from './Voting'
import EndRoom from './EndRoom'

const socket = io('https://spacepantsbackend.herokuapp.com/', {secure: true})

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(createUser(socket))

    subscriptions(socket, this.props)
  }

  render() {
    return (
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route path='/create' component={CreateRoom} />
        <Route path='/join' component={JoinRoom} />
        <Route path='/waiting' component={WaitingRoom} />
        <Route path='/game' component={GameRoom} />
        <Route path='/vote' component={Voting} />
        <Route path='/end' component={EndRoom} />
      </Router>
    )
  }
}

export default connect()(App)
