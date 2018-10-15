import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Location} from 'components'
import './Inputs.css'

// import {selectDate} from 'store/actions'

class Inputs extends Component {
  render() {
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          Inputs
        </div>
      </div>
    )
  }
}

const mapProps = (state, ownProps) => ({
  // user: state.auth.user,
  // locations: state.data.locations,
  // dates: state.data.dates,
  // selectedLocation: state.data.selectedLocation
})

const mapDispatch = {
}

export default connect(mapProps, mapDispatch)(Inputs)
