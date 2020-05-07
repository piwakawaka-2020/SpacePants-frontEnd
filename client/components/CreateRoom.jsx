import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {

  handleSubmit = e => {
    e.preventDefault()

    data = {
      "name": this.state.name,

    }
    this.props.dispatch(joinRoom(data, this.props.socket))
  }


  handleChange = e => {
    this.setstate({
      [e.target.name]: e.target.value
    })
  }

  state = {
    name: "name",

  }

  render() {
    return (
      <form id="Create" onSubmit={this.onSubmit}>
        <label>
          Name:
    <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />

        </label>
        <input type="submit" value="submit" />
      </form>
    )
  }
}

const mapStateToProps = (globalState) => {
  return {
    socket: globalState.localUser.socket
  }
}

export default connect(mapStateToProps)(CreateRoom)




