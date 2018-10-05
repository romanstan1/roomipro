import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Dates.css'
import {BackNav} from 'components';
import {selectDate} from 'store/actions'
import ButtonBase from '@material-ui/core/ButtonBase';


const SingleDate = ({date, handleSelectDate}) =>
  <ButtonBase>
    <div
      data-value={date.date}
      className="date"
      onClick={() => handleSelectDate(date)}
      >
        {date.date}
    </div>
  </ButtonBase>

class Dates extends Component {
  render() {
    const {locations, dates, selectedLocation} = this.props
    return (
      <div className='Dates'>
        <BackNav
          route='somwhere'
          mobile={true}
          >
          {
            selectedLocation &&
            <Fragment>{selectedLocation.main} - {selectedLocation.secondary}</Fragment>
          }
        </BackNav>
        {
          selectedLocation && dates.map(date =>
            <SingleDate
              handleSelectDate={this.props.selectDate}
              key={date.id}
              date={date}
            />
          )
        }
      </div>
    )
  }
}

const mapProps = state => ({
  locations: state.data.locations,
  dates: state.data.dates,
  selectedLocation: state.data.selectedLocation
})

const mapDispatch = {
  selectDate
}

export default connect(mapProps, mapDispatch)(Dates)
