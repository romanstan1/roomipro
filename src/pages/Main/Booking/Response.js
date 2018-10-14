import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const Response = ({handleClick, attendingOnDate}) =>
  <div
    className='Response'>
    {
      attendingOnDate?
      <span onClick={handleClick} className='will-not-attend'>
        Cancel attendance
      </span>:
      <span onClick={handleClick} className='will-attend'>
        I will attend
      </span>
    }
  </div>



export default Response
