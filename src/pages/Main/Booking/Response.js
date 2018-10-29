import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import AnimatedWord from './AnimatedWord'

const chars = ['$','%','#','@','&','=','$','%','*',')','(','?'];
const charsTotal = chars.length - 1;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default class Response extends Component{
  state = {
    pathChange: false
  }
  handleClick = () => {
    this.props.handleClick()
    // this.setState({animating: true})
    // this.startAnimation()
  }


  // just displays what its meant to (first click)
  // knows if its animating, waits for 2nd props, infintely animates through intial word
  // recieves new prom, finishes animation loop without breaking stride


  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log('nextProps, prevState', nextProps, prevState);
  //   // if(nextProps.attendingOnDate) return { text: 'Cancel', loading: nextProps.loading}
  //   // else return { text: 'Book', loading: nextProps.loading}
  //   if(nextProps.attendingOnDate) return { text: 'Cancel'}
  //   else return { text: 'Book'}
  //
  // }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');
    if(nextProps.pathname !== this.props.pathname) {
      this.setState({pathChange: true})
    } else {
      this.setState({pathChange: false})
    }
  }

  render() {
    const {attendingOnDate, future, loading} = this.props
    // console.log('pathname:: ', this.props.pathname);
    if(future) return (
      <div className='Response'>
        {
          attendingOnDate?
          <span className='attending'>You are attending!</span>
          :
          <span className='not-attending'>You are not attending</span>
        }
        <div onClick={this.handleClick} className='book-cancel'>
          <AnimatedWord
            text={attendingOnDate? 'Cancel' : 'Book'}
            loading={loading}
            pathChange={this.state.pathChange}
          />
        </div>

      </div>)
    return (
      <div className='Response'>
        {
          attendingOnDate?
          <span className='attending'>You attended!</span> :
          <span className='attending didnt'>You didnt attend</span>
        }
      </div>
    )
  }
}
