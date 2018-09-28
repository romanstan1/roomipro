import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Logo.css'

const Logo = ({invert}) =>
  <div className={invert? 'Logo invert': 'Logo'}>
    <span></span>
    <Link to='/'>roomipro</Link>
  </div>

export default Logo
