import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default ({handleClose, open, anchorEl, handleLogOut, children}) =>
  <Menu
    id="simple-menu"
    open={open}
    onClose={handleClose}
    anchorEl={anchorEl}
    aria-owns={open ? 'menu-list-grow' : null}
    >
    <span>
      <MenuItem onClick={handleLogOut}>
        <div>Sign Out</div>
        <div>{children}</div>
      </MenuItem>
    </span>
  </Menu>
