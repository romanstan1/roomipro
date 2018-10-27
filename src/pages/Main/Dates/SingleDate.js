import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import {
  Tick,
  Clear,
  PartlyCloudyDay,
  PartlyCloudyNight,
  Wind,
  Rain,
  CloudWind,
  Fog,
  ClearNight,
  Snow,
  Hail
} from './SVGs'

const WeatherIcon = ({icon}) => {
  switch (icon) {
    case 'clear-day': return <Clear/>
    case 'clear-night': return <ClearNight/>
    case 'partly-cloudy-day': return <PartlyCloudyDay/>
    case 'partly-cloudy-night': return <PartlyCloudyNight/>
    case 'wind': return <CloudWind/>
    case 'rain': return <Rain/>
    case 'fog': return <Fog/>
    case 'snow': return <Snow/>
    case 'hail': return <Hail/>
    default: return <span/>
  }
}

const SingleDate = ({date, pushRoute, selectedLocation, locationDate, user, today}) => {
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
  if (date.locations) darksky = date.locations.find( location => selectedLocation.id === location.id)

  return (
    <div
      data-value={date.date}
      className={today === date.id? "SingleDate today" : future? "SingleDate future": "SingleDate past"}
      onClick={() => { pushRoute('/' + selectedLocation.id + '/' + date.id) }}
      >
      <p className='date'>{date.date.slice(0, -5)}</p>
      { attending && <Tick/> }

      <div className="progress-bar">
        <div className={maxCapicity && 'full'} style={{width: `${percentage}%`}}/>
      </div>

      {
        darksky &&
        <span className='weather-icon'>
          <WeatherIcon icon={darksky.weather.icon}/>
          <span>{darksky.weather.icon.replace(/-/g," ")}</span>
          <span>{Math.round((darksky.weather.temperatureHigh - 32) * (5/9))}°C</span>
        </span>
      }
    </div>
  )
}

export default SingleDate
