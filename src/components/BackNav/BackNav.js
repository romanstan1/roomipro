import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './BackNav.css'

const Arrow = () =>
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
</svg>

const BackNav = ({route, children, mobile}) =>
  <div className='BackNav'>
    {
      mobile?
      <Link to={`${route}`}>
        <Arrow/>
      </Link>
      : null
    }
    {children}
  </div>

export default BackNav