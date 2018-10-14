import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {selectLocation, addDateToLocation} from 'store/actions'
import {firestore} from 'firebaseInit'

class SingleLocation extends Component {

  render() {
    const {location, selectLocation, toggleLocationModal, user, push, minDate, maxDate, addDateToLocation} = this.props
    return (
      <div className='SingleLocation'>
        <ButtonBase onClick={() => {
          push('/'+location.id)
          // selectLocation(location)
          this.unsubscribe = firestore
          .collection("locations")
          .doc(location.id)
          .collection("dates")
          .where("id", ">=", minDate)
          .where("id", "<=", maxDate)
          .onSnapshot(querySnapshot => {
            let dates = []
            querySnapshot.forEach(doc => dates.push(doc.data()))
            addDateToLocation(location.id, dates)
          })
        }}>
        <h3>{location.main}</h3>
        <h4>{location.secondary}</h4>
      </ButtonBase>
      {
        user.admin &&
        <div
          onClick={toggleLocationModal(location)}
          className="edit">
          Edit Details
        </div>
      }
    </div>
    )
  }
}


const mapProps = state => ({
  user: state.auth.user,
  minDate: state.data.dates[0].id,
  maxDate: state.data.dates[state.data.dates.length - 1].id
  // pathname: state.routing.location.pathname
})

const mapDispatch = {
  selectLocation,
  push,
  addDateToLocation
}

export default connect(mapProps, mapDispatch)(SingleLocation)
