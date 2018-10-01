import React, {Component, Fragment} from 'react'
import {Logo} from 'components'
import {logOut} from 'store/actions'
import {connect} from 'react-redux'
import {auth} from 'firebaseInit'
import SettingsModal from './SettingsModal'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

class Nav extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
  }

  state = {
    anchorEl: null
  }

  handleLogOut = () => {
    auth.signOut()
      .then(() => {
        this.handleClose()
        this.props.logOut()
      })
      .catch((error) => {
        console.log('Sign-out error:', error)
      })
  }

  handleOpen = event => {
   this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
   this.setState({ anchorEl: null });
  }

  render() {
    const {anchorEl} = this.state
    const {user} = this.props
    return (
      <nav>
        <Logo invert/>

        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          {user.email.charAt(0)}
        </Button>

        <SettingsModal
          handleClose={this.handleClose}
          handleLogOut={this.handleLogOut}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
        >
        {user.email}
        </SettingsModal>
      </nav>
    )
  }
}

const mapDispatch = {
  logOut
}

const mapState = state => ({
  user: state.auth.user
})

export default connect(mapState, mapDispatch)(Nav)
