import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import './Location.css'
import MenuItem from '@material-ui/core/MenuItem';

const SingleLocation = ({location}) =>
  <div className='SingleLocation'>
    <MenuItem>
      <h3>{location.main} - {location.secondary}</h3>
      {/* <h4>Seats {location.seats}</h4> */}
    </MenuItem>
  </div>

class Location extends Component {
  render() {
    const {locations} = this.props
    return (
      <div className='Location'>
        <Nav/>
        <h2>Locations</h2>
        {
          locations.map(location =>
            <SingleLocation
              key={location.id}
              location={location}
            />
          )
        }
      </div>
    )
  }
}

const mapProps = state => ({
  locations: state.data.locations
})

export default connect(mapProps)(Location)
