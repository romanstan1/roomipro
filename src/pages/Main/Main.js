import React, {Component, Fragment} from 'react'
import Location from './Location/Location'
import './Main.css'
import {firestore} from 'firebaseInit'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData} from 'store/actions'
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment'
// renders 3 column layout
// checks screen width,
// if mobile size renders scrollable panels
// else desktop, renders resizable columns

// if the route param is update, show update tabs instead of location and location

// db.collection("cities").doc("SF")
//     .onSnapshot(function(doc) {
//         console.log("Current data: ", doc.data());
//     });

// firestore.collection("locations").get()
//   .then(querySnapshot => {
//     console.log('querySnapshot', querySnapshot)
//       querySnapshot.forEach(doc => {
//         console.log(doc.id, doc.data() )
//       })
//     })
//   .catch(error => {
//     console.log('error::', error)
//   })

//
//
// const currentDate = new Date()
// const day = currentDate.getDate()
//
// console.log(day)
// console.log(currentDate)


function createDate(days, weeks) {
  return moment()
    .add(weeks, 'weeks')
    .startOf('isoWeek')
    .add(days - 1, 'days')
    .format('ddd Do MMM YYYY')
}


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

  handleUpdateDates = () => {

    let i = 1, dates = []
    do { dates.push(createDate(i, 1)); i++;}
    while (i < 6)

    console.log(dates)
    // firestore.collection("locations").get()
    // .then(col => {
    //
    //   let eachDayLocationData = {}
    //
    //   col.forEach(doc => {
    //     const data = doc.data()
    //
    //     eachDayLocationData = {
    //       ...eachDayLocationData,
    //       [doc.id]:
    //       {
    //         main: data.main,
    //         secondary: data.secondary,
    //         maxSeats: data.seats,
    //         people: [],
    //         id: doc.id
    //       }
    //     }
    //   })
    //
    //   console.log('eachDayLocationData', eachDayLocationData)
    // }).catch(error => {
    //   console.log("Error getting document:", error);
    // })


  }

  render() {
    const {width} = this.state
    if(width > 650) {
      return (
        <div className='Main'>
          <Location/>
          <div style={{cursor:'pointer'}} onClick={this.handleUpdateDates}>
            Update Dates
          </div>
        </div>
      )
    } else {
      return (
        <SwipeableViews>
          <Location/>
          <div>
            slide n°2
          </div>
          <div>
            slide n°3
          </div>
        </SwipeableViews>
      )
    }
  }
}

const mapDispatch = {
  updateLocationData
}

export default connect(null,mapDispatch)(Main)
