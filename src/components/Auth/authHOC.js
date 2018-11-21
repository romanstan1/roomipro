import React, {Component, Fragment} from 'react'
import {Logo} from 'components'
import {Title, Message} from './AuthModules'
import { emailSuccess, errorMessage } from 'store/actions'
import {Link} from 'react-router-dom'
import {auth, persistence, secondaryAuth, firestore} from 'firebase/initialize'
import {connect} from 'react-redux'
import {compose} from "redux";
import PropTypes from 'prop-types'
import './Auth.css'

import {backOne, backTwo, backThree, backFour} from './backgroundImages'

const randomNum = Math.floor(Math.random() * 4) + 1
const randomImage = randomImageGenerator(randomNum)


function randomImageGenerator(num) {
  switch (num) {
    case 1: return backOne;
    case 2: return backTwo;
    case 3: return backThree;
    case 4: return backFour;
    default: return backFour
  }
}

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
    auth.setPersistence(persistence.SESSION)
      .then(() =>
        auth.signInWithEmailAndPassword(email, password))
      .then(firebaseUser => {
        this.uploadUserData(email, firebaseUser)
      })
      .catch(error => this.props.errorMessage(error))
  }

  uploadUserData = (email, firebaseUser) => {
    const names = email.split("@")[0].split(".")
    const docRef = firestore.collection("users").doc(firebaseUser.user.uid)
    docRef.get().then(doc => {
      if (!doc.exists) {
        docRef.set({
          email,
          firstName: names[0],
          lastName: names[1],
          admin: false
        })
        .catch(error => console.log('Error on user upload::', error))
      }
    }).catch(error => {
      console.log("Error getting document:", error);
    })
  }

  handleSendEmail = () => {
    const {email} = this.state
    const domain = email.replace(/.*@/, "")
    const names = email.split("@")[0].split(".")

    if((domain === 'theuniprogroup.com' && names.length === 2) || email === 'roman.stan3@gmail.com') { // 0 checks if it is a unipro email address
      const password = Math.random().toString(36).slice(-8)
      secondaryAuth.createUserWithEmailAndPassword(email, password) // 1 trys to create new user by default
        .then(() => secondaryAuth.signOut()) // 2 if succeed, signs out
        .then(() => this.sendResetEmail(email))  // 3 then sents reset email to that address
        .catch(error => {
          if(error.code === 'auth/email-already-in-use') this.sendResetEmail(email)  // 4 if fails, ie user already exists, just sends reset email
          else this.props.errorMessage(error) // 5 if fails for another reason, therefore sends error message
        })
    } else {
      this.props.errorMessage({code: 'auth/invalid-email'})
    }
  }

  sendResetEmail = (email) => {
    auth.sendPasswordResetEmail(email).then(() => this.props.emailSuccess(email))
  }

  render() {
    const {email, password} = this.state
    const {error, emailWasASuccess, userMessage} = this.props
    return (
      <Fragment>
        <div
          className="backgroundImage"
          style={{ backgroundImage: `url(${randomImage})`}}
        >
        </div>
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
      </Fragment>
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
