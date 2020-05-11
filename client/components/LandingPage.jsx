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
      <div className='wrapper'>
        <img className = 'pants'/>
        <img className = 'lightblue' src='./img/bg-lightblue-space.png'/>
        <img className = 'darkblue' src='./img/bg-darkblue-space.png'/>
        <img className = 'purple' src ='./img/bg-purple-space.png'/>
        
        <div className = 'lp-title'>
          <h1 className='heading'>SpacePants</h1>
        </div>

        <div className ="lp-btn-bar">
          <button className='button create' onClick={() => this.props.history.push('/create')}>Create Game</button>
          <button className='button join' onClick={() => this.props.history.push('/join')}>Join Game</button>
        </div>
      
        <div className = 'instructions-btn'>
          <p className="button" id="centered-toggle-button" onClick={this.showModal}>How to play</p>
          <HowToModal showModal={this.state.showModal} closeModal={this.closeModal} />
        </div>

                     
      </div>
    )
  }
}

export default connect()(LandingPage)