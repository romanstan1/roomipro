import React, {Component, Fragment} from 'react'
import Location from './Location/Location'
import './Main.css'
import {firestore} from 'firebaseInit'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData} from 'store/actions'
import SwipeableViews from 'react-swipeable-views';

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
          data = {
            ...data,
            [doc.id]: {
              ...doc.data(),
              id: doc.id
            }
          }
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
    if(width > 650) {
      return (
        <div className='Main'>
          <Location/>
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
