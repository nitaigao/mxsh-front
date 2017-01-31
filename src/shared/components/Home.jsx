import React, { Component } from 'react'
import        { connect }   from 'react-redux'

import { Link }             from 'react-router'
import LoginForm            from './LoginForm'

import { login }            from  '../modules/authentication'

class Home extends Component {

  onLogin = (values) => {
    this.props.login(values)
  }

  render() {
    return (
      <div id='home'>
        <p>Your best email, its the last time you will ever need it</p>
        <LoginForm onSubmit={this.onLogin} />
      </div>
    )
  }
}

Home.propTypes = {
  login: React.PropTypes.func.isRequired
}

export default connect(null, { login })(Home)
