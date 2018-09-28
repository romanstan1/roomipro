import React, {Component, Fragment} from 'react'
import {Logo} from 'components'
import {logOut} from 'store/actions'
import {connect} from 'react-redux'
import {auth} from 'firebaseInit'


class Location extends Component {
  handleLogOut = () => {
    auth.signOut().then(() => {
      this.props.logOut()
    }).catch((error) => {
      console.log('Sign-out error:', error)
    })
  }

  render() {
    return (
      <div className='Location'>
        <nav>
          <Logo invert/>
          <div
            className='icon'
            onClick={this.handleLogOut}>
          </div>
        </nav>
        <br/><br/><br/>
        Location

      </div>
    )
  }
}

const mapDispatch = {
  logOut
}

export default connect(null, mapDispatch)(Location);
