import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import Response from './Response';
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore, arrayUnion} from 'firebaseInit'

class Booking extends Component {
  handleResponse = () => {

    const {locations, selectedDate, selectedLocation, user} = this.props
    const locationRef = firestore.collection("locations")
    const bookingUser = { id: user.uid, name: user.firstName + ' ' + user.lastName}

    const dateRef = locationRef
      .doc(selectedLocation.id)
      .collection('dates')
      .doc(`${selectedDate.id}`)

    dateRef
      .get()
      .then(doc => {
        if(doc.exists) dateRef.update({
          "date": selectedDate.date,
          "people": arrayUnion(bookingUser)
        })
        else dateRef.set({
          "date": selectedDate.date,
          "people": [bookingUser]
        })
      })
  }

  render() {
    const {selectedLocation, selectedDate} = this.props
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
              handleClick={this.handleResponse}
            />

            <p>
              Max number of seats: {selectedLocation.seats}
            </p>

          </Fragment>
        }

      </div>
    )
  }
}

const mapProps = state => ({
  selectedDate: state.data.selectedDate,
  selectedLocation: state.data.selectedLocation,
  locations: state.data.locations,
  user: state.auth.user

})

export default connect(mapProps)(Booking)
