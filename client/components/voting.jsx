import React from 'react'
import { connect } from 'react-redux'

class Voting extends React.Component {

state = {

  users: [],
  array: []

}
    render() {
  
    
      return(
    <div>
        <h1> Who do you think is the Alien? </h1>
   
        {
          this.props.users.map(user => {
            return (
              // this.setState({users: name})
              // <button onClick={user.name}>{user.name}</button>
              // <button onClick={user.name}>{user.name}</button>
            <p>{user.name}</p>
            )
              
          })
        }
        
            
       
   </div>

    )}


}

function mapStateToProps(globalState) {

  return {
    socket: globalState.localUser.socket,
    users: globalState.externalUsers
  }
}
  
export default connect(mapStateToProps)(Voting)