import React from 'react'
import { joinRoom } from '../actions/users'
import { connect } from 'react-redux'



class CreateRoom extends React.Component {


    handleSubmit = (event) => {
      event.preventDefault()
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        this.setState({ room: this.state.room + rand });

        data = {
            name: this.state.name,
            room: this.state.room

        }
        this.props.dispatch(joinRoom(data, this.props.socket))

        
    }
    state = {

        name: "name",
        room: ''


    }
    handleChange = (event) => {
        this.setstate({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <>
                <form id="Create" onSubmit={this.onSubmit}>
                    <label>
                        Name of person:
                    <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />

                    </label>
                    <input type="submit" value="submit" />
                </form>
            </>
        )}
}


const mapStateToProps = (globalState) => {
    return {
        socket: globalState.users[0].socket
    }
}
export default connect(mapStateToProps)(createRoom)




