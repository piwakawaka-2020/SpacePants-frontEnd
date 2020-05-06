import React from 'react'
import { connect } from 'react-redux'
import {joinRoom} from '../actions/users'


class JoinRoom extends React.Component {

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        userData = {
            "name": this.state.name,
            "room": this.state.room
            
        }
        this.props.dispatch(joinRoom(userData))
    }



    render(){
        return(
            <div>
                <h1>Join a game!</h1>
                <div>
                    <form id="roomJoin" onSubmit={this.onSubmit}>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                        <input type="text" name="room" value={this.state.room} onChange ={this.handleChange}/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps) (JoinRoom)