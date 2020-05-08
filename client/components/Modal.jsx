import React from "react"
import "../../public/styles.css"
import PropTypes from "prop-types"

export default class Modal extends React.Component {
    
    onClose = evt => {
    this.props.onClose && this.props.onClose(evt)
  }
  render() {
    if (!this.props.show) {
      return null
    }
    return (
      
        <>
        
        <h2>How to play</h2>
        <div className="content">{this.props.children}</div>
        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            Close
          </button>
        </div>
      
      
      </>
    )
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}