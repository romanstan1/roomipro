import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import './Inputs.css'
// import {selectDate} from 'store/actions'

const InputBox = ({handleInput, value, type, dataType, name, placeholder}) =>
  <div className='input-box'>
    {name && <span>{name}</span>}
    <div>
      <input
        onChange={handleInput}
        value={value}
        data-type={dataType}
        type={type}
        placeholder={placeholder}
      />
    </div>
  </div>


class Inputs extends Component {
  state = {
    main: '',
    secondary: '',
    url: '',
    seats: 0,
    lat: 0,
    lng: 0,
    id:''
  }

  handleTextInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  handleNumberInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  render() {

    const {main, secondary, url, seats, lat, lng, id} = this.state
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>

          <InputBox
            // name='Main Location'
            placeholder='Enter the main location'
            handleInput={this.handleTextInput}
            value={main}
            dataType='main'
            type='text'
          />
          <InputBox
            // name='Secondary Location'
            placeholder='Enter the secondary location'
            handleInput={this.handleTextInput}
            value={secondary}
            dataType='secondary'
            type='text'
          />
          <InputBox
            // name='Image URL'
            placeholder='Enter the image url for this location'
            handleInput={this.handleTextInput}
            value={url}
            dataType='url'
            type='text'
          />

          <div className='numbers-inline'>
            <InputBox
              name='Max Seats:'
              handleInput={this.handleNumberInput}
              value={seats}
              dataType='seats'
              type='number'
            />
            <InputBox
              name='Lat:'
              handleInput={this.handleNumberInput}
              value={lat}
              dataType='lat'
              type='number'
            />
            <InputBox
              name='Lng:'
              handleInput={this.handleNumberInput}
              value={lng}
              dataType='lng'
              type='number'
            />
          </div>
          <ButtonBase className='CTAbutton'>
            Update Location
          </ButtonBase>
        </div>
      </div>
    )
  }
}

const mapProps = (state, ownProps) => ({
  // user: state.auth.user,
  // locations: state.data.locations,
  // dates: state.data.dates,
  // selectedLocation: state.data.selectedLocation
})

const mapDispatch = {
}

export default connect(mapProps, mapDispatch)(Inputs)
