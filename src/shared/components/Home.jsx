import React, { Component } from 'react'
import        { connect }   from 'react-redux'

import { Link }             from 'react-router'
import LoginForm            from './LoginForm'

import { login }            from  '../modules/authentication'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false }
  }

  onLogin = (values) => {
    this.props.login(values)
    this.setState({submitted: true})
  }

  get loginForm() {
    if (this.state.submitted) {
      return (<p>Check your email!</p>)
    } else {
      return (<LoginForm onSubmit={this.onLogin} />)
    }
  }

  render() {
    return (
      <div id='home'>
        {this.loginForm}
      </div>
    )
  }
}

Home.propTypes = {
  login: React.PropTypes.func.isRequired
}

export default connect(null, { login })(Home)
