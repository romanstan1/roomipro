import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import InputBox from './InputBox'
import {postNotification} from 'firebase/modules'
import './Inputs.css'

class SendNotification extends Component {
  state = {
    title: '',
    body: '',
    link: ''
  }

  handleTextInput = e => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  sendNotification = () => {
    // const {title, body, link} = this.state
    postNotification(this.state)
  }

  handleTextInput = e => this.setState({[e.target.dataset.type]: e.target.value})

  render() {
    const {title, body, link} = this.state
    return (
      <div className='Inputs'>
        <Location/>
        <div className='input-section'>
          <h2>Send Notification</h2>
          <br/>
          <InputBox
            placeholder='Enter title of notification'
            handleInput={this.handleTextInput}
            value={title}
            dataType='title'
            type='text'
          />
          <InputBox
            placeholder='Enter body of notification'
            handleInput={this.handleTextInput}
            value={body}
            dataType='body'
            type='text'
          />
          <InputBox
            placeholder='Enter URL link'
            handleInput={this.handleTextInput}
            value={link}
            dataType='link'
            type='text'
          />
          <ButtonBase
            className='CTAbutton'
            onClick={this.sendNotification}>
            Send Notification
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

export default connect(mapProps, mapDispatch)(SendNotification)
