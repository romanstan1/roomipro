import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import './Location.css'

class Location extends Component {
  render() {
    return (
      <div className='Location'>
        <Nav/>
        <br/><br/><br/>
        Location
      </div>
    )
  }
}

export default connect()(Location)
