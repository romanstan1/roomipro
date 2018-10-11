import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Dates.css'
import {BackNav} from 'components';
import {selectDate} from 'store/actions'
import {push} from 'react-router-redux'
import SingleDate from './SingleDate'

class Dates extends Component {
  render() {
    const {locations, dates, selectedLocation, push} = this.props
    return (
      <div className='Dates'>
        <BackNav
          route='somwhere'
          mobile={true}
          >
          {
            selectedLocation &&
            <Fragment>{selectedLocation.main} - {selectedLocation.secondary}</Fragment>
          }
        </BackNav>
        <div className='date-scroll'>
          {
            selectedLocation && dates.map(date => {

              const attending = locations
                .find(location => location.id === selectedLocation.id).dates
                .find(locationDate => date.id === locationDate.id)

              return <SingleDate
                pushRoute={push}
                selectedLocation={selectedLocation}
                handleSelectDate={this.props.selectDate}
                key={date.id}
                date={date}
                attending={!!attending}
              />
            })
          }
        </div>
      </div>
    )
  }
}

const mapProps = (state, ownProps) => ({
  // pathname: state.routing.location.pathname,
  // location: state.routing.location,
  locations: state.data.locations,
  dates: state.data.dates,
  selectedLocation: state.data.selectedLocation
})

const mapDispatch = {
  selectDate,
  push
}

export default connect(mapProps, mapDispatch)(Dates)
