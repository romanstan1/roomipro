import React, {Component} from 'react'
import {Logo} from 'components'
import {Title, Message} from './AuthModules'
import { emailSuccess, errorMessage } from 'store/actions'
import {Link} from 'react-router-dom'
import {auth, persistence, secondaryAuth} from 'firebaseInit'
import {connect} from 'react-redux'
import {compose} from "redux";
import PropTypes from 'prop-types'
import './Auth.css'

const authHOC = PassedComponent => class AuthHOC extends Component {

  static propTypes = {
    userMessage: PropTypes.string,
    error: PropTypes.bool.isRequired,
    emailWasASuccess: PropTypes.bool.isRequired,
    emailSuccess: PropTypes.func.isRequired,
    errorMessage: PropTypes.func.isRequired,
  }

  state = {
    email:'',
    password:''
  }

  handleChange = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  handleSignIn = () => {
    const {email, password} = this.state
    auth.setPersistence(persistence.SESSION).then(() =>
      auth.signInWithEmailAndPassword(email, password)).catch(error => this.props.errorMessage(error)
    )
  }

  handleSendEmail = () => {
    const {email} = this.state
    const domain = email.replace(/.*@/, "")

    if(domain === 'theuniprogroup.com') { // 0 checks if it is a unipro email address
      secondaryAuth.createUserWithEmailAndPassword(email, 'default') // 1 trys to create new user by default
        .then(firebaseUser => secondaryAuth.signOut()) // 2 if succeed, signs out
        .then(() => this.sendResetEmail(email))  // 3 then sents reset email to that address
        .catch(error => {
          if(error.code === 'auth/email-already-in-use') this.sendResetEmail(email)  // 4 if fails, ie user already exists, just sends reset email
          else this.props.errorMessage(error) // 5 if fails for another reason, therefore sends error message
        })
    } else {
      this.props.errorMessage({message: "This is not a valid Unipro email address"})
    }
  }

  sendResetEmail = (email) => {
    auth.sendPasswordResetEmail(email).then(() => this.props.emailSuccess(email))
  }

  render() {
    const {email, password} = this.state
    const {error, emailWasASuccess, userMessage} = this.props
    return (
      <div className='Auth'>
        <Logo/>
        <Title/>
        <Message error={error}>{userMessage}</Message>
        <div className="card">
          <PassedComponent
            email={email}
            password={password}
            handleChange={this.handleChange}
            handleSignIn={this.handleSignIn}
            handleSendEmail={this.handleSendEmail}
            emailSuccess={emailWasASuccess}
          />
        </div>
      </div>
    )
  }
}

const mapDispatch = {
  emailSuccess,
  errorMessage
}

const mapState = state => ({
  userMessage: state.auth.userMessage,
  error: state.auth.error,
  emailWasASuccess: state.auth.emailSuccess
})

export default compose(connect(mapState, mapDispatch),authHOC)
