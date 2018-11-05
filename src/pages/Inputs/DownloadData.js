import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore} from 'firebaseInit'
import InputBox from './InputBox'
import './Inputs.css'
import { CSVLink, CSVDownload } from "react-csv";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class DownloadData extends Component {
  state = {
    downloadBy: 'Location',
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  }

  handleTextInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }
  beginDownload = () => {
    var obj = {a: 123, b: "4 5 6"};
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  }

  handleSelect = (ranges) => {
		console.log('ranges:', ranges);
    this.setState({selection: ranges.selection})
		// {
		// 	selection: {
		// 		startDate: [native Date Object],
		// 		endDate: [native Date Object],
		// 	}
		// }
	}

  render() {

    // <DateRangePicker
    // 	ranges={[this.state.selection]}
    // 	onChange={this.handleSelect}
    //   months={1}
    //   maxDate={new Date()}
    //   scroll={{enabled: true}}
    //   showPreview={false}
    //   // moveRangeOnFirstSelection={false}
    //   className={'PreviewArea'}
    // />
    const {locations} = this.props
    console.log('state:', this.state);

    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          <h2>Download Data</h2>
          <br/>

          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />

          <div className='download-data'>
            <CSVLink
              asyncOnClick={true}
              data={locations}>
              Download Data
            </CSVLink>
          </div>

        </div>
      </div>
    )
  }
}

const mapProps = state => ({
  locations: state.data.locations
})

const mapDispatch = {
}

export default connect(mapProps, mapDispatch)(DownloadData)
