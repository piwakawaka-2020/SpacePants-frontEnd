import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import io from 'socket.io-client'
import { connect } from 'react-redux'

import { createUser } from '../actions/localUser'
import WaitingRoom from './WaitingRoom'

import LandingPage from './LandingPage'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'

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
        <Route path='/' component={LandingPage} />
        <Route path='/waiting' component={WaitingRoom} />
        <Route path='/create' component={CreateRoom} />
        <Route path='/join' component={JoinRoom} />
        
      </Router>
    )
  }
}

//emit room code to server, 
export default connect()(App)
