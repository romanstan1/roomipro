import React, {Component, Fragment} from 'react'
import {Location} from 'components'
import Dates from './Dates/Dates'
import Booking from './Booking/Booking'
import {firestore} from 'firebaseInit'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData, updateWidth} from 'store/actions'
import SwipeableViews from 'react-swipeable-views';
import { Resize, ResizeHorizon } from "react-resize-layout";
import './Main.css'

class Main extends Component {

  static propTypes = {
    updateLocationData:PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.unsubscribe = firestore.collection("locations")
      .onSnapshot(querySnapshot => {
        let data = {}
        querySnapshot.forEach(doc => {
          data = { ...data, [doc.id]: {...doc.data(), id: doc.id}}
        })
        this.props.updateLocationData(data)
      })
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
    if(width > 650) return (
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
  updateWidth
}

const mapProps = state => ({
  page: state.data.page,
  width: state.data.width
})

export default connect(mapProps,mapDispatch)(Main)
