import React, { Component, Fragment } from 'react';
import {Route, Router} from 'react-router-dom'
import {connect} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Main, LogIn, SendEmail, UpdatePassword} from 'pages'
import 'styles/global.css'

export const history = createBrowserHistory()

export const App = ({isAuthenticated}) =>
  <Router history={history}>
    {
      isAuthenticated?
        <Fragment>
          <Route exact path="/update-password" component={UpdatePassword}/>
          <Route exact path="/send-email" component={SendEmail}/>
          <Route component={LogIn}/>
        </Fragment>
      :
      <Route component={Main}/>
    }
  </Router>

const mapProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapProps)(App)
