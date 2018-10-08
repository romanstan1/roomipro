import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import {selectLocation} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import {push} from 'react-router-redux'
import './Location.css'

const SingleLocation = ({location, selectLocation, pushRoute}) =>
  <div className='SingleLocation'>
    <ButtonBase onClick={() => {
      pushRoute('/location/'+location.id)
      selectLocation(location)
    }}>
      <h3>{location.main}</h3>
      <h4>{location.secondary}</h4>
    </ButtonBase>
  </div>

class Location extends Component {
  render() {
    const {locations, push} = this.props
    return (
      <div className='Location'>
        <Nav/>
        <h2>Locations</h2>
        {
          locations.map(location =>
            <SingleLocation
              pushRoute={push}
              selectLocation={this.props.selectLocation}
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

const mapDispatch = {
  selectLocation,
  push
}

export default connect(mapProps, mapDispatch)(Location)
