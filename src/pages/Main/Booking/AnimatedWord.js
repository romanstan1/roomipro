import React, {Component, Fragment} from 'react'

export default class AnimatedWord extends Component {

  state = {displayedText: null}

  // componentDidMount() {
  //   console.log('didmount !!!!!!!!!!!!!!!!!!!!');
  //   this.setState({displayedText: })
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loading, pathChange, text} = nextProps
    if(loading) {
      console.log('on loading begins here...... ', nextProps);
      return {
        displayedText: text
      }
      
    } else if (pathChange) {
      // console.log('path change here...... ', nextProps);
      return {
        displayedText: text
      }
    } else if (!prevState.displayedText) {
      // console.log('mounted here...... ');
      return {
        displayedText: text
      }
    } else if (!loading) {
      // not path change, and loading false, therefore loading end. TWICE
      console.log('loading ends here..... ', nextProps);
      return null
    }
  }

  // just pass through + text
  // loadingAnimtion + text // infinite loop on this
  // loadingAnimationToEnd + newText

  render() {
    const {loading, text, pathChange} = this.props
    // console.log('loading', loading);
    // if(this.state.text === text) console.log('equal equal equal equal equal');

    // console.log('text::', text);
    // console.log('loading::', loading);
    // console.log('pathChange::', pathChange);
    // console.log(' ');

    return (
      <span>
        {this.state.displayedText}
      </span>
    )
  }
}



// if loading is true
// if loading false, and pathchange true, pass through props





// startAnimation = () => {
//   // this.setState({...this.state, animating:true})
//
//   const lA = this.state.text.split('')
//   let whichLetter = 0
//   this.cycleThroughWord(whichLetter, lA)
// }

// cycleThroughWord = (whichLetter, lA) => {
//   setTimeout(()=>{
//     if(whichLetter < lA.length){
//       this.flickLetter(whichLetter, lA)
//       whichLetter++
//       this.cycleThroughWord(whichLetter, lA)
//     } else {
//       // whichLetter = 0
//       // this.cycleThroughWord(whichLetter, lA)
//     }
//   }, 150)
// }
//
// flickLetter = (whichLetter, lA) => {
//   const newLetter = chars[getRandomInt(0, charsTotal)]
//   lA[whichLetter] = newLetter
//   this.setState({text: lA.join("")})
//   this.confirmNewLetter(whichLetter, lA)
// }
//
// confirmNewLetter = (whichLetter, lA) => {
//   // const nTA = this.state.newText.split('')
//   // if(whichLetter > nTA.length) lA[whichLetter] = ''
//   // else lA[whichLetter] = nTA[whichLetter]
//   // setTimeout(()=>{
//   //   this.setState({text: lA.join("")})
//   // }, 120)
// }
