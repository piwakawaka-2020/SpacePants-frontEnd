import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {  } from "module";

import io from 'socket.io-client'

const socket = io('http://localhost:4000')

class App extends React.Component {
  render() {
    console.log(socket.id)
    return (
      <Router>
        <Route path='/' component={LandingPage} />
        <Route path='/createRoom' component={createRoom} />
      </Router>
    )
  }
}

const mapStateToProps = ({createRoom}) => {
  return {
    socket.emit('a')
  }
}
export default connect(mapStateToProps)(App) 

