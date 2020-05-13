import React from "react"
import HowToModal from "./HowToModal"

import { connect } from 'react-redux'
import { positiveClick, negativeClick } from '../../server/sound'



class LandingPage extends React.Component {
  componentDidMount() {
    const img1 = '../img/pants-lg-157-285.png'
    const img2 = '../img/pants-step2-157-285.png'
    this.setState({pantsImage: img1})

    let walkingPants = setInterval(() => {
      if (this.state.pantsImage == img1) {
        this.setState({pantsImage: img2})
      } else (this.setState({pantsImage: img1}))
    }, 500)

    this.setState({walkingPants})

    this.shadow()
  }

  componentWillUnmount() {
    clearInterval(this.state.walkingPants)
  }

  state = {
    showModal: false,
    pantsImage: '',
    shadowArr: []
  }

  toggleModal = e => {
    this.state.showModal ? negativeClick.play() : positiveClick.play()
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleClick = (e) =>{
    positiveClick.play()
    if(e.target.innerText === 'Create Game'){
      this.props.history.push('/create')
    } else {
      this.props.history.push('/join')
    }
    this.setState({
      showModal: !this.state.showModal
    })
  }

  // .header {
  // text-align: center;
  // color: $pink;
  // padding: $defaultPadding/2;
  // margin: 0px;
  // font-size: 3.5rem;

  // &.main {
  //   position: relative;
  //   top: 68px;
    
  //   font-size: 5rem;
  //   letter-spacing: .03rem;
  shadow = () => {
    let top = 76
    let fontSize = 5
    let colour1 = 53
    let colour2 = 123
    let colour3 = 175
    let shadowStyle = {
      textAlign: 'center',
      color: `rgb(${colour1},${colour2},${colour3})`,
      margin: '0px',
      position: 'absolute',
      top: `${top}px`, 
      fontSize: `${fontSize}rem`,
      letterSpacing: '.03rem',
      zIndex: -5,
      opacity: 1
    }
    let shadowArr = []
    for (let i=0; i<50; i++) {
      shadowStyle = {
        ...shadowStyle,
        top: `${top+(i*1.3)}px`,
        fontSize: `${fontSize-(i/35)}rem`,
        opacity: shadowStyle.opacity-(i/((i+1)*40)),
        color: `rgb(${colour1-(i*(1.7))},${colour2-(i*4)},${colour3-(i*3)})`,
        zIndex: shadowStyle.zIndex-1
      }
      shadowArr.push(<h1 key={i} style={shadowStyle}>SpacePants</h1>)
    }
    // console.log(shadowArr) 186,67,133
    // console.log(shadowArr.map(item=> {return {color: item.props.style.color}}))
    this.setState({shadowArr})
  }
  render() {

    return (
      <div className='wrapper'>
        <img className='pants' src={this.state.pantsImage} />
        <img className='lightblue' src='./img/bg-lightblue-space.png' />
        <img className='darkblue' src='./img/bg-darkblue-space.png' />
        <img className='purple' src='./img/bg-purple-space.png' />
        <h1 className='header main'>SpacePants</h1>
       
        {this.state.shadowArr}
        <div className="btn-bar">
          <button className='positive-btn' onClick={this.handleClick}>Create Game</button>
          <button className='positive-btn' onClick={this.handleClick}>Join Game</button>
        </div>

        <p className="instructions-btn" onClick={this.toggleModal}>How to play</p>

        <HowToModal showModal={this.state.showModal} closeModal={this.toggleModal} />
      </div>
    )
  }
}

export default connect()(LandingPage)