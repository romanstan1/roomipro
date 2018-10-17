import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {LocationModal, NotificationModal} from './Modals'
import {firestore} from 'firebaseInit'
import SingleLocation from './SingleLocation'
import './Location.css'

const PlusCircle = ({handleClick}) =>
  <svg width="16px" height="16px" viewBox="0 0 64 64" onClick={handleClick('add')}>
    <g>
      <path d="m46.551,30.119h-12.143v-12.142c0-1.104-0.895-2-2-2s-2,0.896-2,2v12.143h-12.142c-1.105,0-2,0.896-2,2s0.895,2 2,2h12.143v12.143c0,1.104 0.895,2 2,2s2-0.896 2-2v-12.144h12.143c1.105,0 2-0.896 2-2s-0.896-2-2.001-2z"></path>
      <path d="M32,0C14.355,0,0,14.355,0,32s14.355,32,32,32s32-14.355,32-32S49.645,0,32,0z M32,60    C16.561,60,4,47.439,4,32S16.561,4,32,4s28,12.561,28,28S47.439,60,32,60z"></path>
    </g>
  </svg>

const EditIcon = ({handleClick}) =>
  <svg width="16px" height="16px"
    viewBox="0 0 129 129">
    <path d="m119.2,114.3h-109.4c-2.3,0-4.1,1.9-4.1,4.1s1.9,4.1 4.1,4.1h109.5c2.3,0 4.1-1.9 4.1-4.1s-1.9-4.1-4.2-4.1z"></path>
    <path d="m5.7,78l-.1,19.5c0,1.1 0.4,2.2 1.2,3 0.8,0.8 1.8,1.2 2.9,1.2l19.4-.1c1.1,0 2.1-0.4 2.9-1.2l67-67c1.6-1.6 1.6-4.2 0-5.9l-19.2-19.4c-1.6-1.6-4.2-1.6-5.9-1.77636e-15l-13.4,13.5-53.6,53.5c-0.7,0.8-1.2,1.8-1.2,2.9zm71.2-61.1l13.5,13.5-7.6,7.6-13.5-13.5 7.6-7.6zm-62.9,62.9l49.4-49.4 13.5,13.5-49.4,49.3-13.6,.1 .1-13.5z"></path>
  </svg>

class Location extends Component {

  // state = {
  //   notificationOpen: false,
  //   locationOpen: false,
  //   focusedLocation: {}
  // }
  //
  // toggleNotificationModal = () => this.setState(prevState =>
  //   ({ ...prevState, notificationOpen: !prevState.notificationOpen }))
  //
  toggleLocationModal = (location) => (e) => {
    // if(location) this.setState(prevState => ({ ...prevState, focusedLocation: location }))
    // else if (location === 'add') this.setState(prevState => ({ ...prevState, focusedLocation: {} }))
    // this.setState(prevState => ({ ...prevState, locationOpen: !prevState.locationOpen }))
  }

  // focusOnLocation = () => {
  //
  // }

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
    // const {notificationOpen, locationOpen, focusedLocation} = this.state
    return (
      <Fragment>
        {/* {
          notificationOpen &&
          <NotificationModal
            notificationOpen={notificationOpen}
            closeNotification={this.toggleNotificationModal}
          />
        } */}
        {/* {
          locationOpen &&
          <LocationModal
            locationOpen={locationOpen}
            closeLocation={this.toggleLocationModal}
            focusedLocation={focusedLocation}
            updateLocation={this.updateLocation}
            addLocation={this.addLocation}
          />
        } */}
        <div className='Location'>
          <Nav/>
          {
            user.admin && width > 650 &&
            <Fragment>
              <h3>admin</h3>
              <div className='compose-notification'>
                <ButtonBase>
                  Compose Notification
                </ButtonBase>
              </div>
            </Fragment>
          }
          <div className="location-title">
            <h2>Locations</h2>
            {
              user.admin && width > 650 &&
              <span>
                <EditIcon
                  handleClick={this.toggleLocationModal}
                />
                <PlusCircle
                  handleClick={this.toggleLocationModal}
                />
              </span>

            }
          </div>
          {
            locations.map(location =>
              <SingleLocation
                key={location.id}
                location={location}
                // focusOnLocation={this.focusOnLocation}
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
