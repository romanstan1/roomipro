import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import {downloadLocationData} from 'firebase/modules'
import InputBox from './InputBox'
import './Inputs.css'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'

class DownloadData extends Component {
  state = {
    maxDate: moment().startOf('day'),
    minDate: moment('Mon Oct 05 2018 15:34:41 GMT+0000 (Greenwich Mean Time)'),
    startDate: null,
    endDate: null
  }
  isOutsideRange = (date) => {
    if(date < this.state.minDate) return true
    else if(date >= this.state.maxDate) return true
    return false
  }
  download = () => {
    const {downloadBy, startDate, endDate} = this.state
    downloadLocationData(startDate, endDate)
    .then(data => {
      exportToJson(data)
    })
  }

  render() {
    const {locations, locationOptions} = this.props
    const {startDate, endDate} = this.state
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          <h2>Download Data</h2>
          <span className='label'>Select date range:</span>
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
          <div className={"download-data-button" + (startDate && endDate? '' : ' disabled')}>
            <div onClick={startDate && endDate? this.download : null}>Download Data</div>
          </div>
        </div>
      </div>
    )
  }
}

function exportToJson(objectData) {
  let filename = "export.json";
  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

const mapProps = state => ({
  locations: state.data.location,
  locationOptions: state.data.locations.map(location => location.id)
})

export default connect(mapProps)(DownloadData)
