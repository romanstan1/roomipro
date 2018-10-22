import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import {scaleSequential} from 'd3-scale'
import * as d3 from 'd3-scale-chromatic'
const convert = scaleSequential(d3.interpolateRdYlBu)
  .domain([105, 20])

const SingleDate = ({date, pushRoute, selectedLocation, locationDate, user, today}) => {

  let attending = false
  let maxCapicity = false
  let people = []
  let darksky = null
  let future = today <= date.id
  if(locationDate) {
    attending = !!locationDate.people.find(person => person.id === user.uid)
    people = locationDate.people
    maxCapicity = locationDate.people.length >= parseInt(locationDate.seats)
  }
  if (date.locations) darksky = date.locations.find( location => selectedLocation.id === location.id)

  return <ButtonBase>
    <div
      data-value={date.date}
      className={today === date.id? "SingleDate today" : future? "SingleDate future": "SingleDate past"}
      onClick={() => {
        pushRoute('/' + selectedLocation.id + '/' + date.id)
      }}

      style={darksky && {background: convert(darksky.weather.temperatureHigh)}}
      >
        {date.date} <br/>
        {
          future?
            attending?
            <span className='attending'> You are attending </span>:
            <span className='not-attending'>You are not attending</span>
            :
            attending?
            <span className='attending'> You attended</span>:
            <span className='not-attending'>You did not attend</span>
        }
        { maxCapicity && <span className='max-capicity'> Max capicity </span> }
        {
          darksky &&
          <Fragment>
            <span>icon: {darksky.weather.icon}</span>
            <span>temperatureHigh: {darksky.weather.temperatureHigh}</span>
            <span>cloudCover : {darksky.weather.cloudCover}</span>
            <span>precipProbability: {darksky.weather.precipProbability}</span>
            <span>summary: {darksky.weather.summary}</span>
          </Fragment>
        }
      </div>
    </ButtonBase>
}

export default SingleDate
