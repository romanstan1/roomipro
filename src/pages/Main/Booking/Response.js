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
            Cancel
          </ButtonBase>
        </Fragment>
        :
        <Fragment>
          <span className='not-attending'>You are not attending</span>
          <ButtonBase onClick={handleClick} className='will-attend'>
            Book
          </ButtonBase>
        </Fragment>
      }
    </div>)
  return (
    <div className='Response'>
      {
        attendingOnDate?
        <span className='attending'>You attended!</span> :
        <span className='attending didnt'>You didnt attend</span>
      }
    </div>)
}

export default Response
