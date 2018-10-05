import React, {Component, Fragment} from 'react'
import Nav from './Nav/Nav.js'
import {connect} from 'react-redux'
import {selectLocation} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';
import './Location.css'

const SingleLocation = ({location, selectLocation}) =>
  <div className='SingleLocation'>
    <ButtonBase onClick={()=> selectLocation(location)}>
      <h3>{location.main}</h3>
      <h4>{location.secondary}</h4>
    </ButtonBase>
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
  selectLocation
}

export default connect(mapProps, mapDispatch)(Location)
