import React, { Component } from 'react'
import        { connect }   from 'react-redux'

import LoginForm            from './LoginForm'

import { login }            from  '../modules/authentication'

class Home extends Component {

  onLogin = email => this.props.login(email)

  render() {
    return (
      <div id='home'>
        <p>Your best email, its the last time you will ever need it</p>
        <LoginForm onLogin={this.onLogin} />
      </div>
    )
  }
}

Home.propTypes = {
  login: React.PropTypes.func.isRequired
}

export default connect(null, { login })(Home)
