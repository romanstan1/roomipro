import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default ({handleClose, open, anchorEl, handleLogOut}) =>
  <Menu
    id="simple-menu"
    open={open}
    onClose={handleClose}
    anchorEl={anchorEl}
    >
    <span>
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </span>
  </Menu>
