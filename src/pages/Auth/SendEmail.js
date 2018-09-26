import React, {Component, Fragment} from 'react'
import authHOC from './authHOC'
import {EmailInput, PasswordInput, CTAButton, CardFooter} from './AuthModules'

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

export default authHOC(SendEmail)
