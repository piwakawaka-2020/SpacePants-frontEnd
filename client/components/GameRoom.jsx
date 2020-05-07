import React from 'react'

import { connect } from 'react-redux'
import { doVote, doSkip, doComplete } from '../actions/localUser'

class GameRoom extends React.Component {

    handleVote = e => {
        this.props.dispatch(doVote())
    }

    handleSkip = e => {
        this.props.dispatch(doSkip())
    }

    handleComplete = e => {
        this.props.dispatch(doComplete())
    }





    render(){

        let display;
        if (this.props.localUser.role == 'alien') {
            display =   <div>
                            <p>{this.props.localUser.task}</p>
                            <button onCick={this.handleSkip}>skip</button>
                            <button onClick={this.handleComplete}>complete</button>
                        </div>
        } else {
            display = <div>
                        <p>{this.props.localUser.hint}</p>
                        </div>
        }



        return(
            <div>
                <h1>you are a ${this.props.localUser.role}</h1>

                {display}
              
                <button onClick={this.handleVote}>Vote!</button>

            </div>
        )
    }
    
    
}

function mapStateToProps(globalState) {
    return {
      socket: globalState.localUser.socket,
      user: globalState.localUser,
      
    }
  }



export default connect(mapStateToProps)(GameRoom)