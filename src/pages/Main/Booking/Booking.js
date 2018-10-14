import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import Response from './Response';
import {placeBooking} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore, arrayUnion, arrayRemove} from 'firebaseInit'

class Booking extends Component {

  handleResponse = () => {

    const {locations, selectedDate, selectedLocation, user, attendingOnDate, placeBooking} = this.props
    const locationRef = firestore.collection("locations")
    const bookingUser = { id: user.uid, name: user.firstName + ' ' + user.lastName}

    const dateRef = locationRef
      .doc(selectedLocation.id)
      .collection('dates')
      .doc(`${selectedDate.id}`)

    dateRef
      .get()
      .then(doc => {
        if(doc.exists && !attendingOnDate) dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": arrayUnion(bookingUser)
        })
        else if(doc.exists && attendingOnDate) dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": arrayRemove(bookingUser)
        })
        else dateRef.set({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": [bookingUser]
        })
      }).then(() => {
        placeBooking(bookingUser)
      })
  }

  render() {
    const {selectedLocation, selectedDate, attendingOnDate, locations, attendees} = this.props
    return (
      <div className='Booking'>
        <BackNav
          route='somwhere'
          mobile={true}
          >
          {
            selectedDate && <Fragment>{selectedDate.date}</Fragment>
          }
        </BackNav>
        {
          selectedDate &&
          <Fragment>
            <Response
              attendingOnDate={attendingOnDate}
              handleClick={this.handleResponse}
            />
            <p>
              {attendees.length} seats filled out of {selectedLocation.seats}
            </p>

            <h4>Attendees:</h4>
            <p>
              {
                attendees.map(attendee =>
                  <span key={attendee.id}>
                    {attendee.name}
                  </span>)
              }
            </p>

          </Fragment>
        }

      </div>
    )
  }
}

const mapProps = state => ({
  selectedDate: state.data.selectedDate,
  attendingOnDate: state.data.attendingOnDate,
  selectedLocation: state.data.selectedLocation,
  locations: state.data.locations,
  user: state.auth.user,
  attendees: state.data.attendees
})

const mapDispatch = {
  placeBooking
}

export default connect(mapProps, mapDispatch)(Booking)
