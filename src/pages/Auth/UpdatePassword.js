import React, {Component, Fragment} from 'react'
import authHOC from './authHOC'
import {PasswordInput, CTAButton, CardFooter} from './AuthModules'

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

export default authHOC(UpdatePassword)
