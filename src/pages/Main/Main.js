import React, {Component, Fragment} from 'react'
import Location from './Location/Location'
import './Main.css'
import {firestore} from 'firebaseInit'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateLocationData} from 'store/actions'

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

  componentDidMount() {
    firestore.collection("locations")
      .onSnapshot(querySnapshot => {
        let data = {}
        querySnapshot.forEach(doc => {
          // console.log(doc.id, doc.data())
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

  componentWillUnmount() {
    const unsubscribe = firestore.collection("locations").onSnapshot(function () {})
    unsubscribe()
  }

  render() {
    return (
      <div className='Main'>
        <Location/>
      </div>
    )
  }
}

const mapDispatch = {
  updateLocationData
}

export default connect(null,mapDispatch)(Main)
