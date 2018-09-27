import React from 'react'
import {Link} from 'react-router-dom'

export const Title = () =>
<div className='titles'>
  <h1>Lorem, ipsum veritatis</h1>
  <h2>Magnam deleniti, eum qui excepturi dantium ipsum dolor sit amet. Consectetur adipisicing elit error minus.</h2>
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
<form action="">  
  <input
    type="password"
    value={password}
    onChange={handleChange}
    data-type='password'
    placeholder='password'
  />
</form>

export const CTAButton = ({handleClick, children}) =>
  <div
    className='CTAButton'
    onClick={handleClick}
  >
    {children}
  </div>

export const CardFooter = ({link, children}) =>
  <div className="CardFooter">
    <Link to={link}>
      {children}
    </Link>
  </div>
