import React, {Component, Fragment} from 'react'
import {Nav} from 'components'

// renders 3 column layout
// checks screen width,
// if mobile size renders scrollable panels
// else desktop, renders resizable columns

// if the route param is update, show update tabs instead of location and location

export default class Main extends Component {
  render() {
    return (
      <Fragment>
        <div className='Main'>
          Main
        </div>
      </Fragment>
    )
  }
}
