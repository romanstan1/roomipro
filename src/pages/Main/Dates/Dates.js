import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Dates.css'
import {BackNav} from 'components';
import ButtonBase from '@material-ui/core/ButtonBase';


const SingleDate = ({date, handleClick}) =>
  <ButtonBase>
    <div
      data-value={date.date}
      className="date"
      onClick={handleClick}
      >
        {date.date}
    </div>
  </ButtonBase>

class Dates extends Component {

  handleClick = e => {
    console.log('clicked', e)
  }

  render() {
    const {locations, dates} = this.props
    return (
      <div className='Dates'>
        <BackNav
          route='somwhere'
          mobile={true}
          >
          Somewhere
        </BackNav>
        {
          dates.map(date =>
            <SingleDate
              handleClick={this.handleClick}
              key={date.id}
              date={date}
            />
          )
        }
      </div>
    )
  }
}

const mapProps = state => ({
  locations: state.data.locations,
  dates:  state.data.dates
})

export default connect(mapProps)(Dates)
