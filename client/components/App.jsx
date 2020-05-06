import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import LandingPage from './LandingPage'

import io from 'socket.io-client'

const socket = io('http://localhost:4000')

class App extends React.Component {
  render() {
    console.log(socket.id)
    return (
      <Router>
        <Route path='/' component={LandingPage} />
      </Router>
    )
  }
}

export default App
