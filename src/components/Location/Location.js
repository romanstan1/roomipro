import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {LocationModal, NotificationModal} from './Modals'
import {firestore} from 'firebaseInit'
import SingleLocation from './SingleLocation'
import './Location.css'

const PlusCircle = ({handleClick}) =>
  // <svg viewBox="0 0 24 24" onClick={handleClick('add')}>
  //   <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
  // </svg>
<svg width="16px" height="16px" viewBox="0 0 64 64" onClick={handleClick('add')}>
  <g>
    <path d="m46.551,30.119h-12.143v-12.142c0-1.104-0.895-2-2-2s-2,0.896-2,2v12.143h-12.142c-1.105,0-2,0.896-2,2s0.895,2 2,2h12.143v12.143c0,1.104 0.895,2 2,2s2-0.896 2-2v-12.144h12.143c1.105,0 2-0.896 2-2s-0.896-2-2.001-2z"></path>
    <path d="M32,0C14.355,0,0,14.355,0,32s14.355,32,32,32s32-14.355,32-32S49.645,0,32,0z M32,60    C16.561,60,4,47.439,4,32S16.561,4,32,4s28,12.561,28,28S47.439,60,32,60z"></path>
  </g>
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
    const {locations, push, user, width} = this.props
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
            user.admin && width > 650 &&
            <Fragment>
              <h3>admin</h3>
              <div className='compose-notification'>
                <ButtonBase onClick={this.toggleNotificationModal}>
                  Compose Notification
                </ButtonBase>
              </div>
            </Fragment>
          }
          <div className="location-title">
            <h2>Locations</h2>
            {
              user.admin && width > 650 &&
              <PlusCircle
                handleClick={this.toggleLocationModal}
              />
            }
          </div>
          {
            locations.map(location =>
              <SingleLocation
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
  user: state.auth.user,
  width: state.data.width
})

export default connect(mapProps)(Location)
