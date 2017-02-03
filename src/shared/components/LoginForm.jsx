import React from 'react'
import { Field, reduxForm } from 'redux-form'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false }
  }

  onSubmit = (e) => {
    this.setState({submitted: true})
    const { handleSubmit } = this.props
    handleSubmit(e)
  }

  render() {
    if (this.state.submitted) {
      return (<p>Check your email!</p>)
    } else {
      return (
        <form onSubmit={this.onSubmit}>
          <p>Your best email, its the last time you will ever need it</p>
          <Field name='email' component='input' type='email' />
          <button type='submit'>Login</button>
        </form>
      )
    }
  }
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({ form: 'login' })(LoginForm)
