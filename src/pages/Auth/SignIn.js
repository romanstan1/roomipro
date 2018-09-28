import React, {Component, Fragment} from 'react'
import {EmailInput, PasswordInput, CTAButton, CardFooter} from './AuthModules'
import authHOC from './authHOC'
import PropTypes from 'prop-types';

const SignIn = ({handleSignIn, handleChange, password, email}) =>
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

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default authHOC(SignIn)
