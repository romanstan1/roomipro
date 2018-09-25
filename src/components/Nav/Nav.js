import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logOut} from 'store/actions'
import './Nav.css'

// renders nav bar, contains Home link
// has hoverable state, and pops small account actions modal, to logout or update password

class Nav extends Component {
  handleLogOut = () => {
    this.props.dispatch(logOut())
  }

  render() {
    return (
      <nav>
        <span onClick={this.handleLogOut}>Log Out</span>
      </nav>
    )
  }
}

const mapProps = (state) => ({
  auth: state.auth.isAuthenticated
})

export default connect(mapProps)(Nav);
