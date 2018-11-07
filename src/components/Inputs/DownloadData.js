import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore} from 'firebase/initialize'
import InputBox from './InputBox'
import './Inputs.css'
import { CSVLink, CSVDownload } from "react-csv";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  'Location', 'Person'
]

class DownloadData extends Component {
  state = {
    downloadBy: null,
    individual: null,
    maxDate: moment().startOf('day'),
    minDate: moment('Mon Oct 05 2018 15:34:41 GMT+0000 (Greenwich Mean Time)')
  }
  handleOptionChange = (e) => {
    this.setState({downloadBy: e.value})
  }
  handleIndividualChange = (e) => {
    this.setState({individual: e.value})
  }
  beginDownload = () => {
    var obj = {a: 123, b: "4 5 6"};
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  }
  isOutsideRange = (date) => {
    if(date < this.state.minDate) return true
    else if(date >= this.state.maxDate) return true
    return false
  }

  render() {
    const {locations, locationOptions} = this.props
    console.log("this.state: ", this.state)
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          <h2>Download Data</h2>
          <span className='label'>Download by:</span>
          <Dropdown
            options={options}
            onChange={this.handleOptionChange}
            value={this.state.downloadBy}
            placeholder="Select an option to download by"
            className='dropdown'
          />
          <span className='label'>Select individual:</span>
          <Dropdown
            options={locationOptions}
            onChange={this.handleIndividualChange}
            value={this.state.individual}
            placeholder="Select an individual to download"
            className='dropdown'
          />
          <span className='label'>Between dates:</span>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            isOutsideRange={this.isOutsideRange}
            initialVisibleMonth={() => moment().subtract(1, 'month')}
          />
        </div>
      </div>
    )
  }
}




const mapProps = state => ({
  locations: state.data.location,
  locationOptions: state.data.locations.map(location => location.id)
})

const mapDispatch = {}

export default connect(mapProps, mapDispatch)(DownloadData)
