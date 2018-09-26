import React, {Component, Fragment} from 'react'
import {EmailInput, PasswordInput, CTAButton, CardFooter} from './AuthModules'
import authHOC from './authHOC'

const LogIn = ({handleSignIn, handleChange, password, email}) =>
  <Fragment>
    <EmailInput
      email={email}
      handleChange={handleChange}
    />
    <PasswordInput
      password={password}
      handleChange={handleChange}
    />
    <CTAButton
      handleClick={handleSignIn}>
      Sign In
    </CTAButton>
    <CardFooter
      link='send-email'>
      Forgot your password?
    </CardFooter>
  </Fragment>

export default authHOC(LogIn)
