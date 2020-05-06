import React from 'react'

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <h1>SpacePants</h1>
        <button onClick={() => this.props.history.push('/create')}>Create Game</button>
        <button onClick={() => this.props.history.push('/join')}>Join Game</button>
      </>
    )
  }
}

export default LandingPage