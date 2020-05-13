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
        {
          this.state.screen ?
            <Voting {...this.props.voteData} />
            :
            <Comms time={this.props.time} />
        }
      </>
    )
  }
}

export default TransitionContainer