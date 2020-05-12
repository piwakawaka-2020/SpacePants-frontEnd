import React from "react"
import HowToModal from "./HowToModal"

import { connect } from 'react-redux'
import { click2, click1 } from '../../public/sound'

class LandingPage extends React.Component {

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

  handleClick = (e) =>{
    if(e.target.innerText === 'Create Game'){
      click1.play()
      this.props.history.push('/create')
    } else {
      click1.play()
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


        <h1 className='header'>SpacePants</h1>


        <div className="btn-bar">
          <button className='positive-btn' onClick={this.handleClick}>Create Game</button>
          <button className='positive-btn' onClick={this.handleClick}>Join Game</button>
        </div>

        <div className='instructions-btn'>
          <p className="button" id="centered-toggle-button" onClick={this.showModal}>How to play</p>
          <HowToModal showModal={this.state.showModal} closeModal={this.closeModal} />
        </div>


      </div>
    )
  }
}

export default connect()(LandingPage)