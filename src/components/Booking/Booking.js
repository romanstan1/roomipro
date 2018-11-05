import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import Response from './Response';
import {placeBooking} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore, arrayUnion, arrayRemove} from 'firebase/initialize'

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

  handleResponse = (guest, addGuestBoolean) => () => {

    const {locations, selectedDate, selectedLocation, user, attendingOnDate, placeBooking} = this.props
    const locationRef = firestore.collection("locations")
    const bookingUser = { id: user.uid, name: user.firstName + ' ' + user.lastName}

    placeBooking(selectedLocation.id, selectedDate.id)

    // const userRef = firestore
    //   .collection("users")
    //   .doc(user.uid)
    //   .collection('dates')
    //   .doc(`${selectedDate.id}`)

    const dateRef = locationRef
      .doc(selectedLocation.id)
      .collection('dates')
      .doc(`${selectedDate.id}`)

    dateRef
      .get()
      .then(doc => {
        if(guest && addGuestBoolean) dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": arrayUnion({...bookingUser, guest: Math.floor(Date.now() / 1000) }),
          "seats": selectedLocation.seats
        })
        else if(guest && !addGuestBoolean) {
          const guest = doc.data().people.find(person => ((bookingUser.id === person.id) && person.guest))
          dateRef.update({
            "id": selectedDate.id,
            "date": selectedDate.date,
            "people": arrayRemove(guest),
            "seats": selectedLocation.seats
          })
        } else if(doc.exists && !attendingOnDate)
        dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": arrayUnion(bookingUser),
          "seats": selectedLocation.seats
        })
        else if(doc.exists && attendingOnDate){
          const people = doc.data().people.filter(person => bookingUser.id !== person.id)
          dateRef.update({
            "id": selectedDate.id,
            "date": selectedDate.date,
            "people": people,
            "seats": selectedLocation.seats
          })
        } else dateRef.set({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": [bookingUser],
          "seats": selectedLocation.seats
        })
      })

    // userRef
    //   .get()
    //   .then(doc => {
    //     if(doc.exists && !attendingOnDate) userRef.update({
    //       "id": selectedDate.id,
    //       "date": selectedDate.date
    //     })
    //     else if(doc.exists && attendingOnDate) userRef.update({
    //       "id": selectedDate.id,
    //       "date": selectedDate.date
    //     })
    //     else userRef.set({
    //       "id": selectedDate.id,
    //       "date": selectedDate.date
    //     })
    //   })
  }

  handleAddGuest = () => {

  }
  handleRemoveGuest = () => {

  }

  render() {
    const {selectedLocation, selectedDate, attendingOnDate, locations, attendees, width, maxSeats, loadingThesePages, today, pathname, user, guestsAttendingOnDate, totalAttendees} = this.props
    const {loading} = this.state
    return (
      <div className='Booking'>
        <BackNav
          route={selectedLocation? '/'+ selectedLocation.id : ''}
          mobile={width > 650? false : true}
          >
          { selectedDate && <Fragment>{selectedDate.date}</Fragment> }
        </BackNav>
        {
          selectedDate &&
          <Fragment>
            <Response
              fullyBooked={totalAttendees >= maxSeats}
              attendingOnDate={attendingOnDate}
              handleResponse={this.handleResponse}
              future={today <= selectedDate.id}
              loading={loading}
              pathname={pathname}
              guestsAttendingOnDate={guestsAttendingOnDate}
            />
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
  attendingOnDate: state.data.attendingOnDate,
  selectedLocation: state.data.selectedLocation,
  locations: state.data.locations,
  user: state.auth.user,
  attendees: state.data.attendees,
  width: state.data.width,
  maxSeats: state.data.maxSeats,
  loadingThesePages: state.data.loadingThesePages,
  today: state.data.today,
  pathname: state.routing.location.pathname,
  guestsAttendingOnDate: state.data.guestsAttendingOnDate,
  totalAttendees: state.data.totalAttendees
})

const mapDispatch = {
  placeBooking
}

export default connect(mapProps, mapDispatch)(Booking)
