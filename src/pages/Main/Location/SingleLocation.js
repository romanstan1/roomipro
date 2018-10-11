import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {selectLocation} from 'store/actions'
import {firestore} from 'firebaseInit'

const SingleLocation = ({location, selectLocation, toggleLocationModal, user, push}) =>
  <div className='SingleLocation'>
    <ButtonBase onClick={() => {
      push('/location/'+location.id)
      selectLocation(location)

      // firestore
      //   .collection("locations")
      //   .doc(location.id)
      //   .collection("dates")
      //   .where("id", ">=", val)
      //   .where("id", "<=", val)
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

const mapProps = state => ({
  user: state.auth.user
})

const mapDispatch = {
  selectLocation,
  push
}

export default connect(mapProps, mapDispatch)(SingleLocation)
