import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import AnimatedWord from './AnimatedWord'
import {connect} from 'react-redux'
import {placeBooking} from 'store/actions'
import {handleBooking} from 'firebase/modules'

const confirmationText = [
  "Awesome! See you there.",
  "Great, that's booked.",
  "Done! See you then.",
  "We'll save you a spot!"
]
const roomFullText = [
  "We're sorry, it's fully booked.",
  "All full up! Sorry.",
  "Looks a bit busy!"
]

class Response extends Component{
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

  handleResponse = (guest, addGuestBoolean) => () => {
    handleBooking(guest, addGuestBoolean, this.props)
  }

  render() {
    const {
      handleResponse,
      attendingOnDate,
      loading,
      guestsAttendingOnDate,
      totalAttendees,
      maxSeats,
      today,
      selectedDate
    } = this.props

    const fullyBooked = totalAttendees >= maxSeats
    const future = today <= selectedDate.id

    const copyVal = parseInt(selectedDate.id.toString().charAt(7)) * 0.5
    const confirmVal = copyVal%4
    const fullVal = (copyVal + 1)%3

    if(future) return (
      <div className='Response'>
        <span className='attending'>
          {attendingOnDate && confirmationText[confirmVal]}
        </span>
        <span className='fully-booked'>
          {fullyBooked && !attendingOnDate && roomFullText[fullVal]}
        </span>
        <div
          onClick={fullyBooked && !attendingOnDate? null: this.handleResponse(false, false)}
          className={'book-cancel' + (attendingOnDate? ' cancel' : '') + (fullyBooked && !attendingOnDate? ' disabled' : ' allowed')}>
          <AnimatedWord
            text={attendingOnDate? 'Cancel' : 'Book'}
            loading={loading}
            pathChange={this.state.pathChange}
          />
        </div>
        <div className='guests'>
          {
            attendingOnDate &&
            <Fragment>
              <div className='guest-heading'>
                <h4>Guests<span>{!!guestsAttendingOnDate && guestsAttendingOnDate}</span></h4>
              </div>
              <div className="guest-buttons">
                <span
                  className={(fullyBooked?'disable' : '')}
                  onClick={fullyBooked? null : this.handleResponse(true, true)}> +1
                </span>
                <span
                  className={(guestsAttendingOnDate>0?'':'disable')}
                  onClick={guestsAttendingOnDate>0? this.handleResponse(true, false) : null}> -1
                </span>
              </div>
            </Fragment>
          }
        </div>

      </div>
    )
    return (
      <div className='Response past'>
        {
          attendingOnDate?
          <span className='attending'>You attended!</span> :
          <span className='attending didnt'>You didnt attend</span>
        }
      </div>
    )
  }
}

const mapProps = state => ({
  selectedDate: state.data.selectedDate,
  attendingOnDate: state.data.attendingOnDate,
  selectedLocation: state.data.selectedLocation,
  user: state.auth.user,
  attendees: state.data.attendees,
  maxSeats: state.data.maxSeats,
  today: state.data.today,
  pathname: state.routing.location.pathname,
  guestsAttendingOnDate: state.data.guestsAttendingOnDate,
  totalAttendees: state.data.totalAttendees
})

const mapDispatch = {
  placeBooking
}

export default connect(mapProps, mapDispatch)(Response)
