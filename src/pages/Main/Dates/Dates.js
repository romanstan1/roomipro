import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {BackNav} from 'components';
import {push} from 'react-router-redux'
import SingleDate from './SingleDate'
import ButtonBase from '@material-ui/core/ButtonBase';
import './Dates.css'

class Dates extends Component {
  state = {
    previousDatesHidden: true
  }

  handleHideDate = () => {
    this.setState({previousDatesHidden: !this.state.previousDatesHidden})
  }

  render() {
    const {locations, dates, selectedLocation, push, user, width, today} = this.props
    const {previousDatesHidden} = this.state
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
            selectedLocation &&
            <ButtonBase onClick={this.handleHideDate}>
              <div className="show-previous-dates">
                {previousDatesHidden? "Show past dates" : "Hide past dates" }
              </div>
            </ButtonBase>
          }
          {
            selectedLocation && dates.map(date => {

              if (previousDatesHidden && today > date.id) return null

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
                today={today}
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
  width: state.data.width,
  today: state.data.today
})

const mapDispatch = {
  push
}

export default connect(mapProps, mapDispatch)(Dates)
