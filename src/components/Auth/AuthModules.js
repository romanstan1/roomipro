import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export const Title = () =>
<div className='titles'>
  <h1>Let's Work Together</h1>
</div>

export const EmailInput = ({handleChange, email}) =>
  <input
    type="text"
    value={email}
    onChange={handleChange}
    data-type='email'
    placeholder='you@theuniprogroup.com'
  />

export const PasswordInput = ({handleChange, password}) =>
  <input
    type="password"
    value={password}
    onChange={handleChange}
    data-type='password'
    placeholder='password'
    autoComplete='password'
  />

export class CTAButton extends Component {
  state = {
    pressDown: false
  }
  handlePress = () => {
    this.setState({ pressDown: !this.state.pressDown})
  }
  render() {
    const {handleClick, children} = this.props
    const {pressDown} = this.state
    return (
      <div
        className={pressDown? 'CTAButton pressDown' : 'CTAButton'}
        onClick={handleClick}
        onMouseDown={this.handlePress}
        onMouseUp={this.handlePress}
        onTouchStart={this.handlePress}
        onTouchEnd={this.handlePress}
        >
          {children}
        </div>
    )
  }
}

export const CardFooter = ({link, children}) =>
  <div className="CardFooter">
    <Link to={link}>
      {children}
    </Link>
  </div>

export const OutlookLink = ({link, children}) =>
  <div className="OutlookLink">
    <a href={link} target="_blank">
      {children}
    </a>
  </div>

export const Message = ({children, error}) =>
<div className="Message">
  {
     children &&
    <p className={error? 'error':''} dangerouslySetInnerHTML={{ __html: children }}/>
  }
</div>
