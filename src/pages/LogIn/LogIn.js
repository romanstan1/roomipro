import React, {Component} from 'react'

export default class LogIn extends Component {

  state = {
    username:'',
    password:''
  }

  render() {
    const {username, password} = this.state
    return (
      <div>
        <h3>Log in</h3>
        <h4></h4>
        <input type="text" value={username}/>
        <input type="text" value={password}/>
      </div>
    )
  }
}


// 2 input fields
// statful

// fires action on 'login'
