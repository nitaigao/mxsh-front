import React, { Component } from 'react';
import        { Link }      from 'react-router';
import        { connect }   from 'react-redux'

import LoginForm            from './LoginForm'

import { login }            from  '../modules/authentication'

class Home extends Component {
  render() {
    return (
      <div id="home">
        <p>Your best email, its the last time you will ever need it</p>
        <LoginForm onLogin={this.onLogin} />
      </div>
    )
  }
  onLogin = (email) => {
    this.props.login(email)
  }
}

export default connect(null, { login: login })(Home)