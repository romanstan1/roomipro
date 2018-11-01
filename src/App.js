import React, { Component, Fragment } from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Main, SignIn, SendEmail, Inputs, DeleteInput, SendNotification, DownloadData} from 'pages'
import {auth, persistence, firestore, messaging} from 'firebaseInit'
import {logInSuccessful} from 'store/actions'
import PropTypes from 'prop-types'
import {selectLocation, selectDate, switchPage, focusOnLocation} from 'store/actions'
import { Offline } from "react-detect-offline";
import 'styles/global.css'

export const history = createBrowserHistory()

class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const route = nextProps.pathname.split('/')
    const {selectedLocation, locations, dates, user} = nextProps

    if(route.length === 2 && route[1] === 'add-location') {
      /// data for add a new location
      const state = {
        main: '', secondary: '', url: '',
        seats: 0, lat: 0, lng: 0,
        id:''
      }
      nextProps.focusOnLocation(state)

    } else if(route.length === 3 && locations.length &&
      (route[1] === 'update-location' || route[1] === 'delete-location' )) {
      /// data for edit/update or delete location
      const selectThisLocation = locations.find(location => location.id === route[2])
      const {dates, ...noDates} = selectThisLocation
      nextProps.focusOnLocation(noDates)

    } else if(route.length === 2) {
      // data for selection of location
      const selectThisLocation = locations.find(location => location.id === route[1])
      nextProps.selectLocation(selectThisLocation)
      nextProps.switchPage(1)

    } else if( route.length === 3) {
      // data for selection of date
      const date = dates.find(date => date.id === parseInt(route[2]))
      if(selectedLocation) {
        const locationDate = locations
          .find(location => location.id === selectedLocation.id).dates
          .find(locationDate => date.id === locationDate.id)
        let attending = false
        let people = []
        let seats = parseInt(selectedLocation.seats)

        if(locationDate && user) {
          attending = !!locationDate.people.find(person => person.id === user.uid)
          people = locationDate.people
          seats = locationDate.seats
        }
        nextProps.selectDate(date, attending, people, seats, user)
        nextProps.switchPage(2)
      }
    }

    if(route.length <= 1 || route[1] === 'sign-in' || route[1] === '') {
      // switch to 1 if sign in/ login
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

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
          console.log('ServiceWorker registration successful with scope');
        }, err => {
          console.log('ServiceWorker registration failed');
        }).catch(err => {
          console.log(err)
        })
      })
    } else {
      console.log('service worker is not supported');
    }

    if(!!messaging) {
      messaging.requestPermission()
      .then(() => messaging.getToken())
      .then(token => {
        console.log('token:: ', token);
        let url = 'https://us-central1-room-ipro.cloudfunctions.net/app/registerDevice'

        fetch(url,
          {
            method: "POST",
            mode: 'cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:"token=" + token + "&topic=roomipro1" // the topic name
          })
          .then(res => res.json())
          .then(resp => console.log("Successfully registered for notifications", resp))
          .catch(error => console.log("Error with notification registration", error))
      })
      .catch(error => console.log("Error with messaging request persmission", error))
    }

  }

  render() {
    const {isAuthenticated} = this.props
    const {page} = this.state
    return (
      <Router history={history}>
        <Fragment>
          <Offline>
            <div className="offline"> No internet detected. Roomipro will automatically try to connect when it detects an internet connection. </div>
          </Offline>
          {
            isAuthenticated?
            <Fragment>
              <Switch>
                <Route exact path="/sign-in" render={() => <Redirect to="/" />} />
                <Route path="/update-location" component={Inputs}/>
                <Route path="/add-location" component={Inputs}/>
                <Route path="/delete-location" component={DeleteInput}/>
                <Route path="/send-notification" component={SendNotification}/>
                <Route path="/download-data" component={DownloadData}/>
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
        </Fragment>
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
  switchPage,
  focusOnLocation
}

export default connect(mapProps, mapDispatch)(App)
