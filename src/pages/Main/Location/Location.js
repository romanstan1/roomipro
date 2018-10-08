import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import {selectLocation} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import {push} from 'react-router-redux'
import {LocationModal, NotificationModal} from './Modals'
import './Location.css'
import {firestore} from 'firebaseInit'

const SingleLocation = ({location, selectLocation, pushRoute, toggleLocationModal}) =>
  <div className='SingleLocation'>
    <ButtonBase onClick={() => {
      pushRoute('/location/'+location.id)
      selectLocation(location)
    }}>
      <h3>{location.main}</h3>
      <h4>{location.secondary}</h4>
    </ButtonBase>
    <div
      onClick={toggleLocationModal(location)}
      className="edit">
      Edit Details
    </div>
  </div>

class Location extends Component {

  state ={
    notificationOpen: false,
    locationOpen: false,
    focusedLocation: {}
  }

  toggleNotificationModal = () => this.setState(prevState =>
    ({ ...prevState, notificationOpen: !prevState.notificationOpen }))

  toggleLocationModal = (location) => (e) => {
    if(location) this.setState(prevState => ({ ...prevState, focusedLocation: location }))
    this.setState(prevState => ({ ...prevState, locationOpen: !prevState.locationOpen }))
  }

  updateLocation = (location) => {
    firestore
      .collection("locations")
      .doc(location.id)
      .set({ ...location }, { merge: true })
  }

  render() {
    const {locations, push, user} = this.props
    const {notificationOpen, locationOpen, focusedLocation} = this.state
    return (
      <Fragment>
        {
          notificationOpen &&
          <NotificationModal
            notificationOpen={notificationOpen}
            closeNotification={this.toggleNotificationModal}
          />
        }
        {
          locationOpen &&
          <LocationModal
            locationOpen={locationOpen}
            closeLocation={this.toggleLocationModal}
            focusedLocation={focusedLocation}
            updateLocation={this.updateLocation}
          />
        }
        <div className='Location'>
          <Nav/>
          {user.admin &&
            <Fragment>
              <h3>You have admin privileges</h3>
              <div className='compose-notification'>
                <ButtonBase onClick={this.toggleNotificationModal}>
                  Compose Notification
                </ButtonBase>
              </div>
            </Fragment>
          }

          <h2>Locations</h2>
          {
            locations.map(location =>
              <SingleLocation
                pushRoute={push}
                selectLocation={this.props.selectLocation}
                key={location.id}
                location={location}
                toggleLocationModal={this.toggleLocationModal}
              />
            )
          }
        </div>
      </Fragment>
    )
  }
}

const mapProps = state => ({
  locations: state.data.locations,
  user: state.auth.user
})

const mapDispatch = {
  selectLocation,
  push
}

export default connect(mapProps, mapDispatch)(Location)
