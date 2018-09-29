import React, {Component, Fragment} from 'react'
import {Logo} from 'components'
import {logOut} from 'store/actions'
import {connect} from 'react-redux'
import {auth} from 'firebaseInit'
import SettingsModal from './SettingsModal'
import Button from '@material-ui/core/Button';


class Nav extends Component {
  state = {
    anchorEl: null
  }

  handleLogOut = () => {
    auth.signOut()
      .then(() => this.props.logOut())
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

  handleLogOut = () => {
    this.handleClose()
  }

  render() {
    const {anchorEl} = this.state
    return (
      <nav>
        <Logo invert/>

        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          R
        </Button>

        <SettingsModal
          handleClose={this.handleClose}
          handleLogOut={this.handleLogOut}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
        />
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
