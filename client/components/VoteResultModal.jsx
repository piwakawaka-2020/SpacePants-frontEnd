import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

class VoteResultModal extends React.Component {

  customStyles = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    content: {
      display:  'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      backgroundColor: '#23272a',
      borderRadius: '10px',
      margin: 'auto',
      height: '20%',
      textAlign: 'center'
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
          <h1>Vote Failed!</h1>
      </Modal>
    )
  }
}

export default VoteResultModal