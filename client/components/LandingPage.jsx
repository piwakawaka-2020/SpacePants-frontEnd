import React from "react"
import HowToModal from "./HowToModal"

import { connect } from 'react-redux'
import { positiveClick } from '../../server/sound'

class LandingPage extends React.Component {

  state = {
    showModal: false
  }

  toggleModal = e => {
    positiveClick.play()
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleClick = (e) =>{
    positiveClick.play()
    if(e.target.innerText === 'Create Game'){
      this.props.history.push('/create')
    } else {
      this.props.history.push('/join')
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <img className='pants' />
        <img className='lightblue' src='./img/bg-lightblue-space.png' />
        <img className='darkblue' src='./img/bg-darkblue-space.png' />
        <img className='purple' src='./img/bg-purple-space.png' />

        <h1 className='header main'>SpacePants</h1>

        <div className="btn-bar">
          <button className='positive-btn' onClick={this.handleClick}>Create Game</button>
          <button className='positive-btn' onClick={this.handleClick}>Join Game</button>
        </div>

        <p className="instructions-btn" onClick={this.toggleModal}>How to play</p>

        <HowToModal showModal={this.state.showModal} closeModal={this.toggleModal} />
      </div>
    )
  }
}

export default connect()(LandingPage)