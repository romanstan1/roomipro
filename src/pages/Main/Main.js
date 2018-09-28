import React, {Component, Fragment} from 'react'
import Location from './Location/Location'
import './Main.css'

// renders 3 column layout
// checks screen width,
// if mobile size renders scrollable panels
// else desktop, renders resizable columns

// if the route param is update, show update tabs instead of location and location

export default class Main extends Component {
  render() {
    return (
      <div className='Main'>
        <Location/>
      </div>
    )
  }
}
