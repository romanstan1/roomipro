import React, {Component, Fragment} from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';

const Response = ({handleClick}) => 
  <div
    onClick={handleClick}
    className='Response'>
    I will attend
  </div>



export default Response
