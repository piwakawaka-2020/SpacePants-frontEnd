import React from 'react'
import { joinRoom } from '../actions/localUser'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {

  componentDidMount() {
    var min = 1;
    var max = 100;
    var rand =  min + Math.ceil((Math.random() * (max-min)));

    this.setState({
      room: rand
    })
  }


  state = {
    name: "",
    room: ''

  }


  handleSubmit = (e) => {
    e.preventDefault()
  

    const userData = {
      "name": this.state.name,
      "room": this.state.room

    }
    this.props.dispatch(joinRoom(userData, this.props.socket))
    this.props.history.replace('/waiting')
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {


    console.log(this.props)
    return (
      <>
      <h1>{this.state.room}</h1>
      
      <form id="Create" onSubmit={this.handleSubmit}>
        <label>
          Name:
          </label>
    <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />

      
        <input type="submit" value="submit" />
      </form>
      </>
    )
  }
}

const mapStateToProps = (globalState) => {
  return {
    socket: globalState.localUser.socket
    
  }
}

export default connect(mapStateToProps)(CreateRoom)

//if vote passes and is right = go back to end  screen
// if vote passes its wrong go to end game 
// what if everyone votes yes every time 
//if vote doesnt pass you go back to game screen

//person who got vote wrong cant vote for x amount of time,
//The whole group loses x amount of time,
