import React from 'react'
import { connect } from 'react-redux'


class JoinRoom extends React.Component {

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        userData = {
            "userName": this.state.userName,
            "roomCode": this.state.userName
            
        }
        this.props.dispatch(joinRoom(userData))
    }



    render(){
        return(
            <div>
                <h1>Join a game!</h1>
                <div>
                    <form id="roomJoin" onSubmit={this.onSubmit}>
                        <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}/>
                        <input type="text" name="roomCode" value={this.state.roomCode} onChange ={this.handleChange}/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}