import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import {Tick, Clear, PartlyCloudy} from './SVGs'

// import {scaleSequential} from 'd3-scale'
// import * as d3 from 'd3-scale-chromatic'
// const convert = scaleSequential(d3.interpolateRdYlBu)
//   .domain([105, 20])
// style={darksky && {background: convert(darksky.weather.temperatureHigh)}}

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
        { (darksky.weather.icon === 'clear-day' || darksky.weather.icon === 'clear-night') && <Clear/> }
        {
          (darksky.weather.icon === 'partly-cloudy-day' || darksky.weather.icon === 'partly-cloudy-night')
          && <PartlyCloudy/>
        }
        </span>
      }
    </div>
  )
}
// {darksky.weather.icon}
// { maxCapicity && <span className='max-capicity'> Max capicity </span> }

export default SingleDate
