import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import AnimatedWord from './AnimatedWord'

export default class Response extends Component{
  state = {
    pathChange: false
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.pathname !== this.props.pathname) {
      this.setState({pathChange: true})
    } else {
      this.setState({pathChange: false})
    }
  }
  render() {
    const {attendingOnDate, future, loading, fullyBooked, handleResponse, guestsAttendingOnDate} = this.props
    if(future) return (
      <div className='Response'>
        {
          attendingOnDate?
          <span className='attending'>You are attending!</span>:
          <span className='not-attending'>You are not attending</span>
        }
        {
          fullyBooked && <span className='fully-booked'>This room is fully booked</span>
        }
        {
          (fullyBooked && !attendingOnDate)? null:
          <div onClick={handleResponse(false, false)} className='book-cancel'>
            <AnimatedWord
              text={attendingOnDate? 'Cancel' : 'Book'}
              loading={loading}
              pathChange={this.state.pathChange}
            />
          </div>
        }
        {
          attendingOnDate &&
          <div className='guests'>
            <h4>Guests</h4>
            <span
              className={fullyBooked?'disable' : ''}
              onClick={handleResponse(true, true)}> +1
            </span>
            <span
              className={guestsAttendingOnDate>0?'':'disable'}
              onClick={handleResponse(true, false)}> -1
            </span>
          </div>
        }

      </div>
    )
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
