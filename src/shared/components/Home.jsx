import React, { Component } from 'react'
import        { connect }   from 'react-redux'
import { provideHooks }     from 'redial'

import { Link }             from 'react-router'
import LoginForm            from './LoginForm'
import Identities           from './Identities'

import { login, logout }    from  '../modules/authentication'
import { mine }             from  '../modules/identities'

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
})

class Home extends Component {
  onLogin = (values) => {
    const { login } = this.props
    login(values)
  }

  logout = (e) => {
    e.preventDefault()
    const { logout } = this.props
    logout()
  }

  get homeComponent() {
    const { loggedIn } = this.props
    if (loggedIn) {
      return (<Identities />)
    } 
    return (<LoginForm onLogin={this.onLogin} />)
  }

  render() {
    const { loggedIn } = this.props
    return (
      <div id='home'>
        {loggedIn && 
          <Link href='#' onClick={this.logout}>Logout</Link>
        }
        {this.homeComponent}
      </div>
    )
  }
}

Home.propTypes = {
  login: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, { login, logout })(Home)
