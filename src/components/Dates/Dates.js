import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {BackNav} from 'components';
import {push} from 'react-router-redux'
import SingleDate from './SingleDate'
import ButtonBase from '@material-ui/core/ButtonBase';
import './Dates.css'
import { ColorExtractor } from 'react-color-extractor'

const WeekendText = () =>
  <div className="weekend-text">
    It's the weekend!
  </div>

class Dates extends Component {
  state = {
    previousDatesHidden: true,
    displayNavBar: false,
    color: null
  }
  handleHideDate = () => {
    this.setState((prevState) => ({...prevState, previousDatesHidden: !prevState.previousDatesHidden}))
  }
  componentDidMount() {
    this.refs.dates.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    this.refs.dates.removeEventListener('scroll', this.handleScroll);
  }
  setColour = (color) => {
    this.setState({color: color[0]})
  }
  handleScroll = e => {
    if(e.target.scrollTop > 220 && !this.state.displayNavBar) {
      this.setState(prevState => ({
        ...prevState, displayNavBar: true
      }))
    } else if(e.target.scrollTop < 220 && this.state.displayNavBar ) {
      this.setState(prevState => ({
        ...prevState, displayNavBar: false
      }))
    }
  }
  render() {
    const {locations, dates, selectedLocation, push, user, width, today, selectedDate} = this.props
    const {previousDatesHidden, displayNavBar} = this.state
    return (
      <div className='Dates'>
        <BackNav
          route='/'
          mobile={width > 720? false : true}
          date={true}
          displayNavBar={displayNavBar}
          backgroundColor={this.state.color}
          >
          {
            selectedLocation &&
            <Fragment>{selectedLocation.main} - {selectedLocation.secondary}</Fragment>
          }
        </BackNav>
        {
          selectedLocation &&
          <Fragment>
            <div
              className="header-image"
              style={{ background: `url(${selectedLocation.url}) no-repeat`}}
            />
            <ColorExtractor
              src={selectedLocation.url}
              getColors={this.setColour}
            />
          </Fragment>
        }

        <div className='date-scroll' ref="dates">
          {
          selectedLocation &&
          <div className="transparent-box">
            <h2>{selectedLocation.main}</h2>
            <h3>{selectedLocation.secondary}</h3>
          </div>
          }

          {
            selectedLocation &&
            <div className="show-previous-dates" onClick={this.handleHideDate}>
              {previousDatesHidden? "Show past dates" : "Hide past dates" }
            </div>
          }
          {
            selectedLocation && dates.map(date => {
              if (previousDatesHidden && today > date.id) return null

              const locationDate = locations
                .find(location => location.id === selectedLocation.id).dates
                .find(locationDate => date.id === locationDate.id)

              const EachDay = <SingleDate
                key={date.id}
                date={date}
                locationDate={locationDate}
              />

              if(date.dayOfWeek === 5) return (
                <Fragment key={date.id}>
                  {EachDay}
                  <WeekendText/>
                </Fragment>
              )

              return EachDay
            })
          }
        </div>
      </div>
    )
  }
}

const mapProps = (state, ownProps) => ({
  selectedDate: state.data.selectedDate,
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
