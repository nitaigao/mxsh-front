import React, { Component } from 'react'
import        { connect }   from 'react-redux'
import { provideHooks }     from 'redial'

import { Link }             from 'react-router'
import LoginForm            from './LoginForm'
import Identities           from './Identities'

import { login }            from  '../modules/authentication'
import { mine }             from  '../modules/identities'

const hooks = {
  fetch: ({ dispatch, params }) => dispatch(mine())
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
})

class Home extends Component {
  onLogin = (values) => {
    const { login } = this.props
    login(values)
  }

  get homeComponent() {
    const { loggedIn } = this.props
    if (loggedIn) {
      return (<Identities />)
    } else {
      return (<LoginForm onSubmit={this.onLogin} />)
    }
  }

  render() {
    return (
      <div id='home'>
        {this.homeComponent}
      </div>
    )
  }
}

Home.propTypes = {
  login: React.PropTypes.func.isRequired
}

const HomeWithHooks = provideHooks(hooks)(Home)
export default connect(mapStateToProps, { login })(HomeWithHooks)
