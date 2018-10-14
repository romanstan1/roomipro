import React, { Component, Fragment } from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Main, SignIn, SendEmail} from 'pages'
import {auth, persistence, firestore} from 'firebaseInit'
import {logInSuccessful} from 'store/actions'
import PropTypes from 'prop-types'
import 'styles/global.css'
import {selectLocation, selectDate, switchPage} from 'store/actions'


export const history = createBrowserHistory()

class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const route = nextProps.pathname.split('/')
    const {selectedLocation, locations, dates, user} = nextProps

    console.log('route', route)

    if(route.length === 2) {
      const selectThisLocation = locations.find(location => location.id === route[1])
      nextProps.selectLocation(selectThisLocation)
      nextProps.switchPage(1)
    } else if( route.length === 3) {
      const date = dates.find(date => date.id === parseInt(route[2]))
      if(selectedLocation) {
        const locationDate = locations
          .find(location => location.id === selectedLocation.id).dates
          .find(locationDate => date.id === locationDate.id)
        let attending = false
        let people = []
        if(locationDate) {
          attending = !!locationDate.people.find(person => person.id === user.uid)
          people = locationDate.people
        }
        nextProps.selectDate(date, attending, people)
        nextProps.switchPage(2)
      }
    }
    if(route.length <= 1 || route[1] === 'sign-in' || route[1] === '') {
      nextProps.switchPage(0)
    }
    return null
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
    const {page} = this.state
    return (
      <Router history={history}>
        {
          isAuthenticated?
          <Fragment>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/:location" component={Main}/>
              <Route path="/:location/:date" component={Main}/>
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
  isAuthenticated: state.auth.isAuthenticated,
  pathname: state.routing.location.pathname,
  locations: state.data.locations,
  dates: state.data.dates,
  selectedLocation: state.data.selectedLocation,
  user: state.auth.user
})

const mapDispatch = {
  logInSuccessful,
  selectLocation,
  selectDate,
  switchPage
}

export default connect(mapProps, mapDispatch)(App)
