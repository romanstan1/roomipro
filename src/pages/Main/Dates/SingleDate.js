import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const SingleDate = ({date, handleSelectDate, pushRoute, selectedLocation, attending}) =>
  <ButtonBase>
    <div
      data-value={date.date}
      className="SingleDate"
      onClick={() => {
        pushRoute('/location/' + selectedLocation.id + '/' + date.id)
        handleSelectDate(date)
      }}
      >
        {date.date} <br/>
        <span>{attending.toString()}</span>
    </div>
  </ButtonBase>

export default SingleDate
