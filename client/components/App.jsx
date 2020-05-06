import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import LandingPage from './LandingPage'

import io from 'socket.io-client'
import { connect } from 'react-redux'
import { createUser } from '../actions/users'
import WaitingRoom from './WaitingRoom'

const socket = io('http://localhost:3000')

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(createUser(socket))
  }

  render() {
    return (
      <Router>
        <Route path='/' component={LandingPage} />
        <Route path='/waiting' component={WaitingRoom} />
      </Router>
    )
  }
}

export default connect()(App)
