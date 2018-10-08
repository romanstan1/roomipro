import React, {Component, Fragment} from 'react'
import Location from './Location/Location'
import Dates from './Dates/Dates'
import Booking from './Booking/Booking'
import {firestore} from 'firebaseInit'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData} from 'store/actions'
import SwipeableViews from 'react-swipeable-views';
import { Resize, ResizeHorizon } from "react-resize-layout";
import './Main.css'

class Main extends Component {

  static propTypes = {
    updateLocationData:PropTypes.func.isRequired
  }

  state = {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
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
    this.setState({width})
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const {width} = this.state
    if(width > 650) return (
      <div className='Main'>
        <Resize handleWidth="2px" handleColor='#e6ebf1'>
          <ResizeHorizon width="300px" minWidth="270px">
            <Location/>
          </ResizeHorizon>
          <ResizeHorizon width="400px" minWidth="270px">
            <Dates/>
          </ResizeHorizon>
          <ResizeHorizon width="350px" minWidth="350px">
            <Booking/>
          </ResizeHorizon>
        </Resize>
      </div>
    )
    else return (
      <SwipeableViews
        index={0}
        // disabled={true}
        >
        <Location/>
        <Dates/>
        <Booking/>
      </SwipeableViews>
    )
  }
}

const mapDispatch = {
  updateLocationData
}

export default connect(null,mapDispatch)(Main)
