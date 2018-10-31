import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Location} from 'components'
import ButtonBase from '@material-ui/core/ButtonBase';
import {firestore} from 'firebaseInit'
import InputBox from './InputBox'
import './Inputs.css'
import {auth} from 'firebaseInit'

const postNotification = (title, body, link) => {
  auth.currentUser.getIdToken(true).then(idToken => {
    const url = 'https://us-central1-room-ipro.cloudfunctions.net/app/postNotification'
    fetch(url,
      {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + idToken
        },
        body:"title=" + title + "&body=" + body + "&link=" + link + "&icon=https://unipro-innovation-platform.firebaseapp.com/assets/unipro-favicon-small.png"
      })
      .then(res => res.json())
      .then(res => { console.log('res notification::: ',res) })
      .catch(error => console.log("Error with posting notification : ",error))
  }).catch((error) => console.log('error getting Firebase id token: ',error ))
}


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
    const {title, body, link} = this.state
    postNotification(title, body, link)
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
