import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
// import {LocationModal, NotificationModal} from './Modals'
import {firestore} from 'firebaseInit'
import {EditIcon, PlusCircle} from './Icons'
import SingleLocation from './SingleLocation'
import {push} from 'react-router-redux'
import './Location.css'

class Location extends Component {

  render() {
    const {locations, push, user, width} = this.props
    const pushToLocation = this.props.push
    return (
      <Fragment>
        <div className='Location'>
          <Nav/>
          {
            user.admin && width > 650 &&
            <Fragment>
              <h3>Admin</h3>
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
                {/* <EditIcon
                  pushToLocation={pushToLocation}
                /> */}
                <PlusCircle
                  pushToLocation={pushToLocation}
                />
              </span>

            }
          </div>
          {
            locations.map(location =>
              <SingleLocation
                key={location.id}
                location={location}
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

const mapDispatch = {
  push
}

export default connect(mapProps, mapDispatch)(Location)
