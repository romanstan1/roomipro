import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const Response = ({handleClick, attendingOnDate}) =>
  <div
    className='Response'>
    {
      attendingOnDate?
      <ButtonBase onClick={handleClick} className='will-not-attend'>
        Cancel attendance
      </ButtonBase>
      :
      <ButtonBase onClick={handleClick} className='will-attend'>
        I will attend
      </ButtonBase>
    }
  </div>



export default Response
