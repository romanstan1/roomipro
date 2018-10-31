import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import './BackNav.css'

const BackNav = ({route, children, mobile, displayNavBar, date, backgroundImage}) =>
<Fragment>
  <div
    className={
      displayNavBar? 'BackNav date display-nav-bar' :
      date? 'BackNav date' :
      'BackNav'
    }
    style={backgroundImage && {backgroundImage: backgroundImage.url}}
    >
      <span className={mobile? 'mobile': null}>{children}</span>
    </div>
    {
      mobile?
      <div className='arrow'>
        <Link to={`${route}`}>
          <span/>
        </Link>
      </div>
      : null
    }
</Fragment>

export default BackNav
