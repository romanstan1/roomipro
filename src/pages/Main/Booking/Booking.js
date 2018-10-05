import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import ButtonBase from '@material-ui/core/ButtonBase';

class Booking extends Component {
  render() {
    const {selectLocation, selectedDate} = this.props
    return (
      <div className='Booking'>
        <BackNav
          route='somwhere'
          mobile={true}
          >
          {
            selectedDate && <Fragment>{selectedDate.date}</Fragment>
          }
        </BackNav>

      </div>
    )
  }
}

const mapProps = state => ({
  selectedDate: state.data.selectedDate,
  selectLocation: state.data.selectedDate
})

export default connect(mapProps)(Booking)
