import React from 'react'
import { Field, reduxForm } from 'redux-form'

const LoginForm = (props) => {
  const { onLogin, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <p>Your best email, its the last time you will ever need it</p>
      <Field name='email' component='input' type='email' />
      <button type='submit'>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({ form: 'login' })(LoginForm)
