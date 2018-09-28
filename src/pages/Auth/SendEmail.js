import React, {Component, Fragment} from 'react'
import authHOC from './authHOC'
import {EmailInput, PasswordInput, CTAButton, CardFooter, OutlookLink} from './AuthModules'
import PropTypes from 'prop-types'

const SendEmail = ({handleChange, handleSendEmail, email, emailSuccess}) =>
  <Fragment>
    {
      emailSuccess ||
      <EmailInput
        email={email}
        handleChange={handleChange}
      />
    }
    {
      emailSuccess?
      <OutlookLink
        link='http://outlook.office365.com'>
        Link to Outlook 365
      </OutlookLink>
      :
      <CTAButton
        handleClick={handleSendEmail}>
        Send Reset Email
      </CTAButton>
    }
    <CardFooter
      link='/sign-in'>
      Back to sign in
    </CardFooter>
  </Fragment>


SendEmail.propTypes = {
  handleSendEmail: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailSuccess: PropTypes.bool.isRequired
}

export default authHOC(SendEmail)
