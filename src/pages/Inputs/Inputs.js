import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore} from 'firebaseInit'
import InputBox from './InputBox'
import './Inputs.css'

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.focusedLocation) {
      const { main, secondary, url, seats, lat, lng, id } = nextProps.focusedLocation
      if(prevState.id !== id) return { main, secondary, url, seats, lat, lng, id }
    }
    return null
  }

  handleTextInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  handleNumberInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  updateLocation = () => {
    firestore
      .collection("locations")
      .doc(this.state.id)
      .set({ ...this.state }, { merge: true })
  }

  addLocation = (id) => () => {
    firestore
      .collection("locations")
      .doc(id)
      .set({ ...this.state, id })
  }

  render() {
    const {focusedLocation} = this.props
    const {main, secondary, url, seats, lat, lng, id} = this.state
    const newId = (main.replace(/ /g,"-") + '-' + secondary.replace(/ /g,"-")).toLowerCase()
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>

          {
            !id?
            <h2>Add a new location with ID: "{newId}"</h2>:
            <h2>Edit "{id}"</h2>
          }

          <InputBox
            placeholder='Enter the main location'
            handleInput={this.handleTextInput}
            value={main}
            dataType='main'
            type='text'
          />
          <InputBox
            placeholder='Enter the secondary location'
            handleInput={this.handleTextInput}
            value={secondary}
            dataType='secondary'
            type='text'
          />
          <InputBox
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
          {
            !id?
            <ButtonBase className='CTAbutton' onClick={this.addLocation(newId)}>
              Add Location
            </ButtonBase>:
            <ButtonBase className='CTAbutton' onClick={this.updateLocation}>
              Update Location
            </ButtonBase>
          }



        </div>
      </div>
    )
  }
}

const mapProps = state => ({
  focusedLocation: state.data.focusedLocation
})

const mapDispatch = {
}

export default connect(mapProps, mapDispatch)(Inputs)
