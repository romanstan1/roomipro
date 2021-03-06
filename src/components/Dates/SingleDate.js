import { Tick, WeatherIcon } from './modules'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {BackNav} from 'components';
import {push} from 'react-router-redux'
import './SingleDate.css'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
    return (
      <div className='scroll-section'>
      <div
        data-value={date.date}
        className={
          "SingleDate " + (today === date.id ? "today " : '')
          + (future? "future " : "past ") + ((selectedDate && selectedDate.id === date.id) ? 'active': '' )
          + (attending? ' attending': '')
        }
        onClick={() => { this.props.push('/' + selectedLocation.id + '/' + date.id) }}
      >
      <p className='date'>{date.day} {date.dateValue}<span className="thin month"> {date.month}</span></p>
      { attending && <Tick/> }
      <div className="progress-bar">
        <CircularProgressbar
          percentage={percentage}
          text={`${percentage}%`}
          initialAnimation={true}
          styles={{
            root: {},
            path: {
              stroke: percentage === 100? '#f33974' : '#41cc8f',
              strokeLinecap: 'butt',
              strokeWidth: 8,
              transition: 'stroke-dashoffset 0.5s ease 0s'
            }
          }}
        />
      </div>
      {
        darksky &&
        <span className='weather-icon'>
        <WeatherIcon icon={darksky.weather.icon}/>
        {
          darksky.weather.temperatureHigh &&
          <span>{Math.round((darksky.weather.temperatureHigh - 32) * (5/9))}°C</span>
        }
        </span>
      }
      </div>
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
