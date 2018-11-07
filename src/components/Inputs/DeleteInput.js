import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore} from 'firebase/initialize'
import {deleteLocation} from 'firebase/modules'
import InputBox from './InputBox'
import './Inputs.css'

class DeleteInput extends Component {
  state = {
    id:'',
    safetyInput:''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.focusedLocation) {
      const { id } = nextProps.focusedLocation
      if(prevState.id !== id) return { id }
    }
    return null
  }

  handleTextInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }
  render() {
    const {focusedLocation} = this.props
    const {id, safetyInput} = this.state
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          { <h2>Permenently delete the location with ID: "{id}"</h2> }
          <br/>
          <InputBox
            placeholder='Enter the ID for location before you can delete it'
            handleInput={this.handleTextInput}
            value={safetyInput}
            dataType='safetyInput'
            type='text'
          />
          <ButtonBase
            className={safetyInput === id? 'CTAbutton' : 'CTAbutton disable'}
            onClick={safetyInput === id? deleteLocation(this.state) : null}>
            Delete Location
          </ButtonBase>
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

export default connect(mapProps, mapDispatch)(DeleteInput)
