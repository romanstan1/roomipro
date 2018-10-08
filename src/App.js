import React, { Component, Fragment } from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Main, SignIn, SendEmail} from 'pages'
import {auth, persistence, firestore} from 'firebaseInit'
import {logInSuccessful} from 'store/actions'
import PropTypes from 'prop-types'
import 'styles/global.css'

export const history = createBrowserHistory()

class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user) {
        firestore.collection('users').doc(user.uid).get().then(userData => {
          const thisUser = userData.data()
          this.props.logInSuccessful({...user, ...thisUser})
        })
      }
    })
  }
  render() {
    const {isAuthenticated} = this.props
    return (
      <Router history={history}>
        {
          isAuthenticated?
          <Fragment>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/location/:location" component={Main}/>
              <Route path="/location/:location/:date" component={Main}/>
              <Redirect to="/"/>
            </Switch>
          </Fragment>
          :
          <Fragment>
            <Switch>
              <Route exact path="/send-email" component={SendEmail}/>
              <Route exact path="/sign-in" component={SignIn}/>
              <Redirect to="/sign-in"/>
            </Switch>
          </Fragment>
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
