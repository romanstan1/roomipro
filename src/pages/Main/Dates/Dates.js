import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Dates.css'
import {BackNav} from 'components';
import {selectDate} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import {push} from 'react-router-redux'

const SingleDate = ({date, handleSelectDate, pushRoute, selectedLocation}) =>
  <ButtonBase>
    <div
      data-value={date.date}
      className="date"
      onClick={() => {
        pushRoute('/location/' + selectedLocation.id + '/' + date.id)
        handleSelectDate(date)
      }}
      >
        {date.date}
    </div>
  </ButtonBase>

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
        {
          selectedLocation && dates.map(date =>
            <SingleDate
              pushRoute={push}
              selectedLocation={selectedLocation}
              handleSelectDate={this.props.selectDate}
              key={date.id}
              date={date}
            />
          )
        }
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
