import React, {Component} from 'react'
import {Logo} from 'components'
import {Title} from './AuthModules'
import {Link} from 'react-router-dom'
import {auth, persistence} from 'firebaseInit'
import './Auth.css'

export default (PassedComponent) => class AuthHOC extends Component {

  state = {
    email:'',
    password:''
  }
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyPress.bind(this))
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress.bind(this))
  }
  handleChange = (e) => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }
  handleKeyPress = (e) => {
    if(e.code === "Enter") this.handleSignIn()
  }
  handleSignIn = () => {
    const {email, password} = this.state
    auth.setPersistence(persistence.SESSION).then(() =>
      auth.signInWithEmailAndPassword(email, password)).catch(error => {
        console.log('error: ', error)
    })
  }
  handleSendEmail = () => {
    console.log('handleSendEmail', this.state.email)
  }
  handleUpdatePassword = () => {
    console.log('handleUpdatePassword', this.state.password)
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
