import React from "react"
import HowToModal from "./HowToModal"

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

  render() {
    return (
      <div className="align">
        <h1 className='heading'>SpacePants</h1>
        <button className='button' onClick={() => this.props.history.push('/create')}>Create Game</button>
        <button className='button' onClick={() => this.props.history.push('/join')}>Join Game</button>
        <button
          className="button"
          id="centered-toggle-button"
          onClick={this.showModal}>
          How to play
          </button>

        <HowToModal showModal={this.state.showModal} closeModal={this.closeModal} />
      </div>
    )
  }
}

export default LandingPage