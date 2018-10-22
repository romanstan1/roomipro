import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const Response = ({handleClick, attendingOnDate, future}) => {
  if(future) return (
    <div className='Response'>
      {
        attendingOnDate?
        <Fragment>
          <span className='attending'>You are attending!</span>
          <ButtonBase onClick={handleClick} className='will-not-attend'>
            Cancel attendance
          </ButtonBase>
        </Fragment>
        :
        <ButtonBase onClick={handleClick} className='will-attend'>
          I will attend
        </ButtonBase>
      }
    </div> )
  return <div className='Response'>
    {
      attendingOnDate?
      <span className='attending'>You attended!</span> :
      <span className='attending didnt'>You didnt attend</span>
    }
  </div>
}


export default Response
