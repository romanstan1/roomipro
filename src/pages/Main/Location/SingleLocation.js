import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {addDateToLocation} from 'store/actions'
import {firestore} from 'firebaseInit'

class SingleLocation extends Component {

  state = {
    hover: false
  }
  mouseOver = () => {
    this.setState({hover: true})
  }
  mouseOut = () => {
    this.setState({hover: false})
  }
  handleClick = () => {
    const {location, toggleLocationModal, user, push, minDate, maxDate, addDateToLocation} = this.props
    push('/'+location.id)
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
  }

  render() {
    const {location, toggleLocationModal, user} = this.props
    return (
      <div
        className='SingleLocation'
        onMouseEnter={this.mouseOver}
        onMouseLeave={this.mouseOut}
        style={{backgroundImage: `url(${location.url})`}}
        >
        <ButtonBase onClick={this.handleClick}>
          <h3>{location.main}</h3>
          <h4>{location.secondary}</h4>
        </ButtonBase>
        {
          user.admin && this.state.hover &&
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
})

const mapDispatch = {
  push,
  addDateToLocation
}

export default connect(mapProps, mapDispatch)(SingleLocation)
