import React from 'react'
import { connect } from 'react-redux'

class Voting extends React.Component {

state = {

  users: []

}
    render() {
  
    
      return(
    <div>
        <h1> Who do you think is the Alien? </h1>
   
        {
          this.props.users.map(user => {
            return (<p>{user}</p>)
              
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