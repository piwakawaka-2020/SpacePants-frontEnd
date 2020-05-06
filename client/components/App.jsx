import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import LandingPage from './LandingPage'
import JoinRoom from './JoinRoom'

import io from 'socket.io-client'
import { connect } from 'react-redux'
import { createUser } from '../actions/users'

const socket = io('http://localhost:4000')

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(createUser(socket))
  }

  render() {
    return (
      <Router>
        <Route path='/' component={JoinRoom} />
      </Router>
    )
  }
}

export default connect()(App)
