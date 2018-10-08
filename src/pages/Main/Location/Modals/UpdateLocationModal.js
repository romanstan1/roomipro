import React, {Component, Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';

export default ({state, handleClose, handleTextInput, handleUpdate}) =>
  <Dialog
    open={state.open}
    onClose={handleClose}
    >
    <div className='modal'>
      <div>Main</div>
      <input onChange={handleTextInput} value={state.main} data-type='main' type="text"/>
      <div>Secondary</div>
      <input onChange={handleTextInput} value={state.secondary} data-type='secondary' type="text"/>
      <div>Image URL</div>
      <input onChange={handleTextInput} value={state.link} data-type='image' type="text"/>
      <div className='upload-post'>
        <div
          className={ state.description.length && state.link.length && state.title.length?
            'button bright' : 'button error' }
          onClick={handleUpdate}>Update Location</div>
      </div>
    </div>
  </Dialog>
