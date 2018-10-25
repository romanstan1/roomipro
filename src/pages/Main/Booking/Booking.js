import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import Response from './Response';
import {placeBooking} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore, arrayUnion, arrayRemove} from 'firebaseInit'

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

  handleResponse = () => {

    const {locations, selectedDate, selectedLocation, user, attendingOnDate, placeBooking} = this.props
    const locationRef = firestore.collection("locations")
    const bookingUser = { id: user.uid, name: user.firstName + ' ' + user.lastName}

    placeBooking(selectedLocation.id, selectedDate.id)

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
          "people": arrayUnion(bookingUser),
          "seats": selectedLocation.seats
        })
        else if(doc.exists && attendingOnDate) dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": arrayRemove(bookingUser),
          "seats": selectedLocation.seats
        })
        else dateRef.set({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": [bookingUser],
          "seats": selectedLocation.seats
        })
      })
  }

  render() {
    const {selectedLocation, selectedDate, attendingOnDate, locations, attendees, width, maxSeats, loadingThesePages, today} = this.props
    const {loading} = this.state

    return (
      <div className='Booking'>
        <BackNav
          route={selectedLocation? '/'+ selectedLocation.id : ''}
          mobile={width > 650? false : true}
          >
          { selectedDate && <Fragment>{selectedDate.date}</Fragment> }
        </BackNav>
        <div className={loading? "animated-gradient loading" : "animated-gradient"}/>
        {
          selectedDate &&
          <Fragment>
            <Response
              attendingOnDate={attendingOnDate}
              handleClick={this.handleResponse}
              future={today <= selectedDate.id}
            />
            <div className="attendees">
              <h4>Attendees</h4><h4>{attendees.length} / {maxSeats}</h4>
              <p>
                {
                  attendees.map((attendee, i) =>
                  <span key={attendee.id + attendee.name + i}>
                    {attendee.name}
                  </span>)
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
  today: state.data.today
})

const mapDispatch = {
  placeBooking
}

export default connect(mapProps, mapDispatch)(Booking)
