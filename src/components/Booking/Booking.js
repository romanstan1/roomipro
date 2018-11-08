import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import Response from './Response';
import {placeBooking} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';

class Booking extends Component {

  state = {
    loading: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {selectedLocation, loadingThesePages, selectedDate} = nextProps
    if(selectedDate && selectedLocation) {
      const loading = loadingThesePages.find(page =>
        page.location === selectedLocation.id && page.date === selectedDate.id)
      if(!!loading) return {loading: true}
    }
    return {loading: false}
  }

  render() {
    const {selectedLocation, selectedDate, attendees, width, maxSeats, guestsAttendingOnDate, totalAttendees} = this.props
    const {loading} = this.state
    return (
      <div className='Booking'>
        <BackNav
          route={selectedLocation? '/'+ selectedLocation.id : ''}
          mobile={width > 720? false : true}
          >
          {
            selectedDate &&
            <Fragment>{selectedDate.day} {selectedDate.dateValue}
            <span className='thin'> {selectedDate.month}</span></Fragment> 
          }
        </BackNav>
        {
          selectedDate &&
          <Fragment>
            <Response loading={loading}/>
            <div className="attendees">
              <h4>Attendees</h4><h4>{totalAttendees} / {maxSeats}</h4>
              <p>
                {
                  attendees.map((attendee, i) =>
                    <span key={attendee.id + attendee.name + i}>
                      {attendee.name} {attendee.guests > 0 && ' + ' + attendee.guests}
                    </span>
                  )
                }
              </p>
            </div>
          </Fragment>
        }
      </div>
    )
  }
}

const mapProps = state => ({
  selectedDate: state.data.selectedDate,
  selectedLocation: state.data.selectedLocation,
  attendees: state.data.attendees,
  width: state.data.width,
  maxSeats: state.data.maxSeats,
  loadingThesePages: state.data.loadingThesePages,
  guestsAttendingOnDate: state.data.guestsAttendingOnDate,
  totalAttendees: state.data.totalAttendees
})

export default connect(mapProps)(Booking)
