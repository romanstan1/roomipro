import React, {Component} from 'react'
import {Logo} from 'components'
import {Title} from './AuthModules'
import {Link} from 'react-router-dom'
import './Auth.css'

const authHoc = (PassedComponent) => class AuthHOC extends Component {

  state = {
    email:'',
    password:''
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }

  handleSignIn = () => {
    console.log('handleSignIn')
  }
  handleSendEmail = () => {
    console.log('handleSendEmail')
  }
  handleUpdatePassword = () => {
    console.log('handleUpdatePassword')
  }

  render() {
    const {email, password} = this.state
    return (
      <div className='Auth'>
        <Logo/>
        <Title/>
        <div className="card">
          <PassedComponent
            email={email}
            password={password}
            handleChange={this.handleChange}
            handleSignIn={this.handleSignIn}
            handleSendEmail={this.handleSendEmail}
            handleUpdatePassword={this.handleUpdatePassword}
          />
        </div>
      </div>
    )
  }
}

export default authHoc
