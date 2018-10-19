import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {addDateToLocation} from 'store/actions'
import {firestore} from 'firebaseInit'
import {EditIcon} from './Icons'

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
    const {location} = this.props
    this.props.push('/'+location.id)
  }
  handleEditClick = () => {
    const {location} = this.props
    this.props.push('/update-location/'+location.id)
  }
  render() {
    const {location, user, width} = this.props
    return (
      <div
        className='SingleLocation'
        onMouseEnter={this.mouseOver}
        onMouseLeave={this.mouseOut}
        style={{backgroundImage: `url(${location.url})`}}
        >
        <ButtonBase onClick={this.handleClick}>
          <span>
            <h3>{location.main}</h3>
            <h4>{location.secondary}</h4>
          </span>
        </ButtonBase>
        {
          user.admin && this.state.hover && width > 650 &&
          <div className='edit' onClick={this.handleEditClick}>
            <EditIcon/>
          </div>
        }
    </div>
    )
  }
}

const mapProps = state => ({
  user: state.auth.user,
  width: state.data.width
})

const mapDispatch = {
  push
}

export default connect(mapProps, mapDispatch)(SingleLocation)
