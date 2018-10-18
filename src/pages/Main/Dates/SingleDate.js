import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const SingleDate = ({date, pushRoute, selectedLocation, locationDate, user}) => {

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
      }}
      >
        {date.date} <br/>
        <span>{attending.toString()}</span>
      </div>
    </ButtonBase>
}

export default SingleDate
