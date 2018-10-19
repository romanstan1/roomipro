import React, {Component, Fragment} from 'react'
import {Location} from 'components'
import Dates from './Dates/Dates'
import Booking from './Booking/Booking'
import {firestore} from 'firebaseInit'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData, updateWidth, addDateToLocation} from 'store/actions'
import SwipeableViews from 'react-swipeable-views';
import { Resize, ResizeHorizon } from "react-resize-layout";
import './Main.css'

class Main extends Component {

  static propTypes = {
    updateLocationData:PropTypes.func.isRequired
  }

  componentDidMount() {
    const {minDate, maxDate, addDateToLocation, updateLocationData} = this.props

    window.addEventListener('resize', this.resize)
    this.unsubscribe = firestore.collection("locations")
      .onSnapshot(querySnapshot => {

        let data = {}
        querySnapshot.forEach(doc => {
          data = { ...data, [doc.id]: {...doc.data(), id: doc.id}}
          firestore.collection("locations")
            .doc(doc.id)
            .collection("dates")
            .where("id", ">=", minDate)
            .where("id", "<=", maxDate)
            .onSnapshot(querySnapshot => {
              let dates = []
              querySnapshot.forEach(docQuery => dates.push(docQuery.data()))
              addDateToLocation(doc.id, dates)
            })
        })

        updateLocationData(data)

        // Object.values(data).forEach(location => {
        //   // fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_ROOMIPRO_DARKSKY}/${location.lat},${location.lng}`)
        //   fetch(`api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}`)
        //     .then(res => {
        //       console.log('res', res)
        //       res.json()
        //     })
        //     .then(result => {
        //       console.log('result')
        //       console.log('result:: ', JSON.stringify(result));
        //     })
        //     .catch(error => {
        //       console.log('error!: ',error)
        //     })
        // })

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
  updateWidth,
  addDateToLocation
}

const mapProps = state => ({
  page: state.data.page,
  width: state.data.width,
  minDate: state.data.dates[0].id,
  maxDate: state.data.dates[state.data.dates.length - 1].id
})

export default connect(mapProps,mapDispatch)(Main)
