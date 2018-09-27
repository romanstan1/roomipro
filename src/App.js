import React, { Component, Fragment } from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Main, LogIn, SendEmail, UpdatePassword} from 'pages'
import {auth, persistence} from 'firebaseInit'
import {logInSuccessful} from 'store/actions'
import PropTypes from 'prop-types'
import 'styles/global.css'

export const history = createBrowserHistory()

class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.props.logInSuccessful(user))
  }
  render() {
    const {isAuthenticated} = this.props
    return (
      <Router history={history}>
        {
          !isAuthenticated?
          <Fragment>
            <Switch>
              <Route exact path="/update-password" component={UpdatePassword}/>
              <Route exact path="/send-email" component={SendEmail}/>
              <Route exact path="/log-in" component={LogIn}/>
              <Redirect to="/log-in"/>
            </Switch>
          </Fragment>
          :
          <Route component={Main}/>
        }
      </Router>
    )
  }
}

const mapProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatch = {
  logInSuccessful
}

export default connect(mapProps, mapDispatch)(App)
