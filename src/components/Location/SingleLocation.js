import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import ButtonBase from '@material-ui/core/ButtonBase';
import {addDateToLocation} from 'store/actions'
import {EditIcon, DeleteIcon} from './Icons'
import './SingleLocation.css'

class SingleLocation extends Component {

  state = {
    hover: false
  }
  mouseEnter = () => {
    this.setState({hover: true})
  }
  mouseLeave = () => {
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
  handleDeleteClick = () => {
    const {location} = this.props
    this.props.push('/delete-location/'+location.id)
  }
  render() {
    const {location, user, width, selectedLocation} = this.props
    return (
      <div
        className={'SingleLocation ' + (selectedLocation && (selectedLocation.id === location.id)? 'active' : '')}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        >
        <div className='button' onClick={this.handleClick}>
          <span>
            <div className='bubble' style={{backgroundImage: `url(${location.url})`}}/>
            <h3>{location.main}</h3>
            <h4>{location.secondary}</h4>
          </span>
        </div>
        {
          user.admin && this.state.hover && width > 650 &&
          <Fragment>
            <div className='edit' onClick={this.handleEditClick}>
              <EditIcon/>
            </div>
            <div className='delete' onClick={this.handleDeleteClick}>
              <DeleteIcon/>
            </div>
          </Fragment>
        }
    </div>
    )
  }
}

const mapProps = state => ({
  user: state.auth.user,
  width: state.data.width,
  selectedLocation: state.data.selectedLocation
})

const mapDispatch = {
  push
}

export default connect(mapProps, mapDispatch)(SingleLocation)
