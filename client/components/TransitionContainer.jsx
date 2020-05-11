import React from 'react'

import Voting from './Voting'
import Comms from './Comms'

class TransitionContainer extends React.Component {
  
  state = {
    screen: this.props.screen
  }

  render() {
    return (
      <>
        {this.state.screen === 'Comms' &&
          <Comms />
        }
        {this.state.screen === 'Votes' &&
          <Voting {...this.props.voteData}  />
        }
      </>
    )
  }
}

export default TransitionContainer