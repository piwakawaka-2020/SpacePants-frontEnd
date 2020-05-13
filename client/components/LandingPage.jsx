import React from "react"
import HowToModal from "./HowToModal"

import { connect } from 'react-redux'
import { positiveClick } from '../../server/sound'

class LandingPage extends React.Component {
  componentDidMount() {
    const img1 = '../img/pants-lg-157-285.png'
    const img2 = '../img/pants-step2-157-285.png'
    this.setState({pantsImage: img1})

    let walkingPants = setInterval(() => {
      if (this.state.pantsImage == img1) {
        this.setState({pantsImage: img2})
      } else (this.setState({pantsImage: img1}))
    }, 500)

    this.setState({walkingPants})

  }

  componentWillUnmount() {
    clearInterval(this.state.walkingPants)
  }

  state = {
    showModal: false,
    pantsImage: ''
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
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <img className='pants' src={this.state.pantsImage} />
        <img className='lightblue' src='./img/bg-lightblue-space.png' />
        <img className='darkblue' src='./img/bg-darkblue-space.png' />
        <img className='purple' src='./img/bg-purple-space.png' />

        <h1 className='header main'>SpacePants</h1>

        <div className="btn-bar">
          <button className='positive-btn animate__animated animate__zoomInLeft animate__delay-3s animate__slow' onClick={this.handleClick}>Create Game</button>
          <button className='positive-btn animate__animated animate__zoomInRight animate__delay-3s animate__slow' onClick={this.handleClick}>Join Game</button>
        </div>

        <p className="instructions-btn animate__animated animate__slideInDown animate__delay-3s animate__slow" onClick={this.toggleModal}>How to play</p>

        <HowToModal showModal={this.state.showModal} closeModal={this.toggleModal} />
      </div>
    )
  }
}

export default connect()(LandingPage)