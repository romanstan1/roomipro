import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const SingleDate = ({date, handleSelectDate, pushRoute, selectedLocation, locationDate, user}) => {


  // console.log('locationDate!::', locationDate)
  let attending = false
  let people = []
  if(locationDate) {
    attending = !!locationDate.people.find(person => person.id === user.uid)
    people = locationDate.people
  }
  return <ButtonBase>
    <div
      data-value={date.date}
      className="SingleDate"
      onClick={() => {
        pushRoute('/' + selectedLocation.id + '/' + date.id)
        // handleSelectDate(date, attending, people)
      }}
      >
        {date.date} <br/>
        <span>{attending.toString()}</span>
      </div>
    </ButtonBase>
}

export default SingleDate
