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

const PlusCircle = ({handleClick}) =>
  <svg viewBox="0 0 24 24" onClick={handleClick('add')}>
    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
  </svg>

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
    else if (location === 'add') this.setState(prevState => ({ ...prevState, focusedLocation: {} }))
    this.setState(prevState => ({ ...prevState, locationOpen: !prevState.locationOpen }))
  }

  updateLocation = (location) => {
    firestore
      .collection("locations")
      .doc(location.id)
      .set({ ...location }, { merge: true })
  }

  addLocation = (location) => {
    const id = (location.main.replace(/ /g,"-") + '-' + location.secondary.replace(/ /g,"-")).toLowerCase()
    firestore
      .collection("locations")
      .doc(id)
      .set({ ...location, id })
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
            addLocation={this.addLocation}
          />
        }
        <div className='Location'>
          <Nav/>
          {
            user.admin &&
            <Fragment>
              <h3>You have admin privileges</h3>
              <div className='compose-notification'>
                <ButtonBase onClick={this.toggleNotificationModal}>
                  Compose Notification
                </ButtonBase>
              </div>
            </Fragment>
          }
          <div className="location-title">
            <h2>Locations</h2>
            { user.admin &&
              <PlusCircle
                handleClick={this.toggleLocationModal}
              />
            }
          </div>
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
