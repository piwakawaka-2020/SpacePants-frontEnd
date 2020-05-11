import React from "react"
import HowToModal from "./HowToModal"

import { connect } from  'react-redux'

class LandingPage extends React.Component {

  componentDidMount() {

  }

  state = {
    showModal: false
  }

  showModal = e => {
    this.setState({
      showModal: true
    })
  }

  closeModal = e => {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <div className="align">
        <h1 className='fancyHeader'>SpacePants</h1>
        <button className='positive-btn' onClick={() => this.props.history.push('/create')}>Create Game</button>
        <button className='positive-btn' onClick={() => this.props.history.push('/join')}>Join Game</button>
        <button className="positive-btn" onClick={this.showModal}>How to play</button>

        <HowToModal showModal={this.state.showModal} closeModal={this.closeModal} />
      </div>
    )
  }
}

export default connect()(LandingPage)