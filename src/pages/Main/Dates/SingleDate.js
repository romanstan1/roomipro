import React from 'react'
import { Tick, WeatherIcon } from './modules'

const SingleDate = ({date, pushRoute, selectedLocation, locationDate, user, today, selectedDate}) => {
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
  // const className = "SingleDate " + (today === date.id ? "today " : future? : "future " : "past ") + (selectedDate.id === date.id ? 'active': '' )
  // console.log('date', date, selectedDate);
  return (
    <div
      data-value={date.date}
      className={"SingleDate " + (today === date.id ? "today " : '') + (future? "future " : "past ") + ((selectedDate && selectedDate.id === date.id) ? 'active': '' )}
      onClick={() => { pushRoute('/' + selectedLocation.id + '/' + date.id) }}
      >
      <p className='date'>{date.date.slice(0, -5)}</p>
      { attending && <Tick/> }
      <div className="progress-bar">
        <div className={maxCapicity? 'full' : null} style={{width: `${percentage}%`}}/>
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
