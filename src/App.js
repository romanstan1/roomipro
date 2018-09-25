import React, { Component, Fragment } from 'react';
import {Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Main, LogIn } from 'pages'
import 'styles/global.css'

const App = ({isAuthenticated}) => {
  if(isAuthenticated) {
    return <Route component={LogIn}/>
  } else {
    return <Route component={Main}/>
  }
}

const mapProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapProps)(App)
