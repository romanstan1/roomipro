import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';

export default class LocationModal extends Component {
  state ={
    main: '',
    secondary: '',
    url: '',
    seats: 0,
    id:''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.id === '') return {
      id: nextProps.focusedLocation.id,
      main: nextProps.focusedLocation.main,
      secondary: nextProps.focusedLocation.secondary,
      url: nextProps.focusedLocation.url,
      seats:  nextProps.focusedLocation.seats
    }
  }

  updateLocation = () => {
    this.props.updateLocation(this.state)
    this.props.closeLocation()()
  }

  handleTextInput = e => {
    if(e.target.dataset.type !== 'seats') this.setState({[e.target.dataset.type]: e.target.value})
    else this.setState({seats: parseInt(e.target.value)})
  }

  render () {
    const {closeLocation, locationOpen, focusedLocation} = this.props
    const {url, secondary, main, seats} = this.state
    return (
      <Dialog
        open={locationOpen}
        onClose={closeLocation()}
        >
        <div className='modal notification'>
          <h4>Update "{focusedLocation.id}"</h4>
          <div className='display-post'>
            <div>Main</div>
            <input onChange={this.handleTextInput} value={main} data-type='main' type="text"/>
            <div>Secondary</div>
            <input onChange={this.handleTextInput} value={secondary} data-type='secondary' type="text"/>
            <div>Image Url</div>
            <input onChange={this.handleTextInput} value={url} data-type='url' type="text"/>
            <div>Max Seats</div>
            <input onChange={this.handleTextInput} value={seats} data-type='seats' type="number"/>
          </div>
          <div className='upload-post'>
            <div className='button bright' onClick={this.updateLocation}>Update Location</div>
          </div>
        </div>
      </Dialog>
    )
  }
}
