import React, { Component, Fragment } from 'react';
import {Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Main, LogIn, SendEmail, UpdatePassword} from 'pages'
import 'styles/global.css'

const App = ({isAuthenticated}) => {
  return (
    <Switch>
      <Route exact path="/update-password" component={UpdatePassword}/>
      <Route exact path="/send-email" component={SendEmail}/>
      <Route component={LogIn}/>
    </Switch>
  )
  // if(isAuthenticated) {
  //   )
  // } else {
  //   return <Route component={Main}/>
  // }
}

const mapProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default (App)
