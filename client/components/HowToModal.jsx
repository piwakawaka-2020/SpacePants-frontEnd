import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

class HowToModal extends React.Component {

  customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    content: {
      border: 'none',
      backgroundColor: '#23272a',
      borderRadius: '10px',
      margin: 'auto',
      color: 'black',
      maxHeight: '90%',
    }
  };

  state = {
    showModal: false
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.closeModal}
        style={this.customStyles}>

        <div className='description'>
          <h1>SpacePants</h1>
          <fieldset>
            <legend id='alien'><h2>The Alien</h2></legend>
            <p>
              You are an alien who has recently arrived on planet Earth. Our species looks nothing like humans, but fortunately a new technology has been developed to help you seamlessly blend in: SpacePants! In disguise, you will be safe from the humans as long as you behave just like them. 
            </p>
            <p>
              Luckily, you have a certified huminologist back on your ship, who is sending helpful 'behaviour directives' to your communication device. Make sure to complete as many directives as you can before the time runs out. But be careful, if the humans suspect anything is awry, they may vote to kick you off the planet!
            </p>
          </fieldset>
          <fieldset>
            <legend id='human'><h2>The Humans</h2></legend>
            <p>
              Please read the following message from the Bureau of Space Stuff:
            </p>
            <p>
              Hello fellow human. BOSS scientists have been tracking UFO activity around Earth. Recently our ability to track aliens has been severely compromised by new and highly effective alien disguises. Despite this we have identified an alien presence at your location.
            </p>
            <p>
              Our research has confirmed that you are human; however we cannot be certain of anyone with you. We require you to observe the behaviour of those around you to identify the extra-terrestrial.
            </p>
            <p>
              We are here to support you where we can. BOSS has developed technology enabling us to intercept and translate alien communications. We will relay any and all information to you, which should help you identify alien behaviours
            </p>
            <p>
              For security purposes do not discuss or share the contents of this message with anyone.  Good luck.
            </p>
          </fieldset>
        </div>
      </Modal>
    )
  }
}

export default HowToModal