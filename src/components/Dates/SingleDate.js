import { Tick, WeatherIcon } from './modules'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {BackNav} from 'components';
import {push} from 'react-router-redux'
import './SingleDate.css'

class SingleDate extends Component {
  render() {
    const {date, selectedLocation, locationDate, user, today, selectedDate} = this.props
    let attending = false
    let percentage = 0
    let maxCapicity = false
    let people = []
    let darksky = null
    let future = today <= date.id
    if(locationDate) {
      attending = !!locationDate.people.find(person => person.id === user.uid)
      people = locationDate.people
      percentage = (locationDate.people.length / parseInt(locationDate.seats)) * 100
      maxCapicity = locationDate.people.length >= parseInt(locationDate.seats)
    }
    if(date.locations) darksky = date.locations.find( location => selectedLocation.id === location.id)
    // <span>{darksky.weather.icon.replace(/-/g," ")}</span>

    return (
      <div
        data-value={date.date}
        className={"SingleDate " + (today === date.id ? "today " : '') + (future? "future " : "past ") + ((selectedDate && selectedDate.id === date.id) ? 'active': '' )}
        onClick={() => { this.props.push('/' + selectedLocation.id + '/' + date.id) }}
      >
      <p className='date'>{date.date.slice(0, -5)}</p>
      { attending && <Tick/> }
      <div className="progress-bar">
      <div className={maxCapicity? 'full' : null} style={{height: `${percentage}%`}}/>
      </div>
      {
        darksky &&
        <span className='weather-icon'>
        <WeatherIcon icon={darksky.weather.icon}/>
        <span>{Math.round((darksky.weather.temperatureHigh - 32) * (5/9))}°C</span>
        </span>
      }
      </div>
    )
  }
}

const mapProps = (state, ownProps) => ({
  selectedDate: state.data.selectedDate,
  user: state.auth.user,
  dates: state.data.dates,
  selectedLocation: state.data.selectedLocation,
  width: state.data.width,
  today: state.data.today
})

const mapDispatch = {
  push
}

export default connect(mapProps, mapDispatch)(SingleDate)
