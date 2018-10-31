import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore} from 'firebaseInit'
import InputBox from './InputBox'
import './Inputs.css'

class DownloadData extends Component {
  state = {
    id:'',
    safetyInput:''
  }

  handleTextInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  deleteLocation = () => {
    // firestore
    //   .collection("locations")
    //   .doc(this.state.id)
    //   .delete()
  }

  render() {
    const {id, safetyInput} = this.state
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          <h2>Download Data</h2>
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
            onClick={safetyInput === id? this.deleteLocation : null}>
            Delete Location
          </ButtonBase>
        </div>
      </div>
    )
  }
}

const mapProps = state => ({
  // focusedLocation: state.data.focusedLocation
})

const mapDispatch = {
}

export default connect(mapProps, mapDispatch)(DownloadData)
