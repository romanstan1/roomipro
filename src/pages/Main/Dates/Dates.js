import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Dates.css'
import {BackNav} from 'components';
import {push} from 'react-router-redux'
import SingleDate from './SingleDate'

class Dates extends Component {
  render() {
    const {locations, dates, selectedLocation, push, user, width} = this.props
    return (
      <div className='Dates'>
        <BackNav
          route='/'
          mobile={width > 650? false : true}
          >
          {
            selectedLocation &&
            <Fragment>{selectedLocation.main} - {selectedLocation.secondary}</Fragment>
          }
        </BackNav>
        <div className='date-scroll'>
          {
            selectedLocation && dates.map(date => {

              const locationDate = locations
                .find(location => location.id === selectedLocation.id).dates
                .find(locationDate => date.id === locationDate.id)

              return <SingleDate
                pushRoute={push}
                selectedLocation={selectedLocation}
                key={date.id}
                date={date}
                locationDate={locationDate}
                user={user}
              />
            })
          }
        </div>
      </div>
    )
  }
}

const mapProps = (state, ownProps) => ({
  user: state.auth.user,
  locations: state.data.locations,
  dates: state.data.dates,
  selectedLocation: state.data.selectedLocation,
  width: state.data.width
})

const mapDispatch = {
  push
}

export default connect(mapProps, mapDispatch)(Dates)
