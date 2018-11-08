import React, {Component, Fragment} from 'react'
import {Location, Booking, Dates} from 'components'
import {subscribeToLocation} from 'firebase/modules'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData, updateWidth, addDateToLocation, removeLoadingData, getDarkSky} from 'store/actions'
import SwipeableViews from 'react-swipeable-views';
import './Main.css'

class Main extends Component {

  static propTypes = {
    updateLocationData:PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.unsubscribe = subscribeToLocation(this.props)
  }

  resize = (e) => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.props.updateWidth(width)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const {width} = this.props

    if(width > 720) return (
      <div className='Main'>
        <Location/>
        <Dates/>
        <Booking/>
      </div>
    )
    else return (
      <SwipeableViews
        index={this.props.page}
        disabled={true}
        >
        <Location/>
        <Dates/>
        <Booking/>
      </SwipeableViews>
    )
  }
}

const mapDispatch = {
  updateLocationData,
  updateWidth,
  addDateToLocation,
  removeLoadingData,
  getDarkSky
}

const mapProps = state => ({
  page: state.data.page,
  width: state.data.width,
  minDate: state.data.dates[0].id,
  maxDate: state.data.dates[state.data.dates.length - 1].id,
  user:  state.auth.user
})

export default connect(mapProps,mapDispatch)(Main)
