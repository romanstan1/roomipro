import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './Booking.css'
import {BackNav} from 'components';
import ButtonBase from '@material-ui/core/ButtonBase';

class Booking extends Component {

  handleClick = e => {
    console.log('clicked', e)
  }

  render() {
    const {locations, dates} = this.props
    return (
      <div className='Booking'>
        <BackNav
          route='somwhere'
          mobile={true}
          >
          Sometime
        </BackNav>
        asdasd <br/>
        dfsdfa <br/>
        asdasd <br/>
        dfsdfa <br/>
        asdasd <br/>
        dfsdfa <br/>
        {/* {
          dates.map(date =>
            <SingleDate
              handleClick={this.handleClick}
              key={date.id}
              date={date}
            />
          )
        } */}
      </div>
    )
  }
}

// const mapProps = state => ({
//   locations: state.data.locations,
//   dates:  state.data.dates
// })

export default connect()(Booking)
