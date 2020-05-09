import React from "react"
import Modal from "./Modal"

class LandingPage extends React.Component {

  state = {
    show: false
  }

  showModal = evt => {
    this.setState({
      show: !this.state.show
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
          onClick={evt => {
            this.showModal(evt)
          }}
        >
          {" "}How to play!{" "}
        </button>

        <Modal onClose={this.showModal} show={this.state.show}>
            Alien's have invaded and infiltrated Earth. 
            <br></br> There might one or two here right now.
            <br></br> Be observant and work out who it might be one...
            <br></br> Use the hints. Be careful though!
            <br></br> Work out who the alien is before they take over!
        </Modal>
      </div>
    )
  }
}

export default LandingPage

// import React from 'react'
// import ReactDOM from "react-dom"

// export default LandingPage

// className LandingPage extends React.Component {
//   state = { show: false }

//   showModal = () => {
//     this.setState({ show: true })
//   }
  
//   hideModal = () => {
//     this.setState({ show: false })
//   }
    
//   render() {
//     return (
//       <main>
//         <h1>SpacePants</h1>
//          <button onClick={() => this.props.history.push('/create')}>Create Game</button>
//          <button onClick={() => this.props.history.push('/join')}>Join Game</button>
//         <Modal show={this.state.show} handleClose={this.hideModal} >
//           <p>How to play!</p>
//           <p>Data</p>
//         </Modal>
//         <button type='button' onClick={this.showModal}>Instructions</button>
//       </main>
//     )
//   }
// }

// const Modal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? 'modal display-block' : 'modal display-none'

//   return (
//     <div className={showHideClassName}>
//       <section className='modal-main'>
//         {children}
//         <button
//           onClick={handleClose}
//         >
//           Close
//         </button>
//       </section>
//     </div>
//   )
// }


// const container = document.createElement('div')
// document.body.appendChild(container)
// ReactDOM.render(<LandingPage />, container)