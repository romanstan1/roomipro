import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import './BackNav.css'

const BackNav = ({route, children, mobile, displayNavBar, date, backgroundColor}) => {
  return <Fragment>
    <div
      className={
        displayNavBar? 'BackNav date display-nav-bar' :
        date? 'BackNav date' :
        'BackNav'
      }
      // style={backgroundImage? { background: `url(${backgroundImage.url}) no-repeat`} : null}
      >
      {
        backgroundColor?
        <div
          className='block-color'
          style={{ background: backgroundColor}}
        >
          <div/>
        </div>
        : null
      }
        <span className={'text ' + (mobile? 'mobile': '')}>{children}</span>
      </div>
      {
        mobile?
        <div className={'arrow' + (date? ' date':'')}>
          <Link to={`${route}`}>
            <span/>
          </Link>
        </div>
        : null
      }
  </Fragment>
}

export default BackNav
