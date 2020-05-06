import React from 'react'
import {joinRoom} from '../actions/users'
import {connect} from 'react-redux'



class createRoomm extends React.Component {

    handleSubmit = (event) => {
        data = {
            "name": this.state.name,
        
        }
        this.props.dispatch(joinRoom(data, this.props.socket))
        this.props.socket.emit('user', (userData))
        }
 

    handleChange = (event) => {
        this.setstate({
            [event.target.name]: event.target.value
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
                <input type="submit" value="submit"/>
            </form>
})
}

const mapStateToProps = (globalState) => {
    return {
        socket: globalState.users[0].socket
    }
}
export default connect (mapStateToProps)(createRoom)




