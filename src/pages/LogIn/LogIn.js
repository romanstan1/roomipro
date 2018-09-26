import React, {Component} from 'react'
import {Logo} from 'components'
import {Link} from 'react-router-dom'
import './LogIn.css'

export default class LogIn extends Component {

  state = {
    username:'',
    password:''
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }
  handleSignIn = () => {

  }

  render() {
    const {username, password} = this.state
    return (
      <div className='LogIn'>
        <Logo/>

        <div className='titles'>
          <h1>Lorem, ipsum veritatis</h1>
          <h2>Magnam deleniti, eum qui excepturi dantium ipsum dolor sit amet. Consectetur adipisicing elit error minus.</h2>
        </div>

        <div className="card">
          <input
            type="text"
            value={username}
            onChange={this.handleChange}
            data-type='username'
            placeholder='you@theuniprogroup.com'
          />
          <input
            type="password"
            value={password}
            onChange={this.handleChange}
            data-type='password'
            placeholder='password'
          />
          <div
            className='button sign-in'
            onClick={this.handleSignIn}>
            Sign in
          </div>

          <div className="reset">
            <Link to='reset'>Forgot your password?</Link>
          </div>
        </div>

      </div>
    )
  }
}
