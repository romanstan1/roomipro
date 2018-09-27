import React, {Component, Fragment} from 'react'
import authHOC from './authHOC'
import {EmailInput, PasswordInput, CTAButton, CardFooter} from './AuthModules'
import PropTypes from 'prop-types'

const SendEmail = ({handleChange, handleSendEmail, email}) =>
  <Fragment>
    <EmailInput
      email={email}
      handleChange={handleChange}
    />
    <CTAButton
      handleClick={handleSendEmail}>
      Send Reset Email
    </CTAButton>
    <CardFooter
      link='/'>
      Back to sign in
    </CardFooter>
  </Fragment>

SendEmail.propTypes = {
  handleSendEmail: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}

export default authHOC(SendEmail)
