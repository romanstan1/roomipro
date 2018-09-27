import React, {Component, Fragment} from 'react'
import authHOC from './authHOC'
import {PasswordInput, CTAButton, CardFooter} from './AuthModules'
import PropTypes from 'prop-types';

const UpdatePassword = ({handleChange, handleUpdatePassword, password}) =>
  <Fragment>
    <PasswordInput
      password={password}
      handleChange={handleChange}
    />
    <CTAButton
      handleClick={handleUpdatePassword}>
      Update Password
    </CTAButton>
    <CardFooter
      link='/'>
      Back to sign in
    </CardFooter>
  </Fragment>

UpdatePassword.propTypes = {
  handleUpdatePassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
}
export default authHOC(UpdatePassword)
