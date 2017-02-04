import React                from 'react'
import { Field, reduxForm } from 'redux-form'
import addrs                from 'email-addresses'
import isEmail              from 'validator/lib/isEmail'

const email = value => 
  value && !isEmail(value) ? 'Invalid email address' : undefined

const required = value => value ? undefined : 'Email is required'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
    <input {...input} placeholder={label} type={type}/>
  </div>
)

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false, provider: null }
  }

  onSubmit = (values) => {
    const { onLogin } = this.props
    onLogin(values)
    const email = addrs.parseOneAddress(values.email)
    this.setState({submitted: true, provider: email.domain})
  }

  render() {
    if (this.state.submitted) {
      return (<p>Check your <a href={`http://${this.state.provider}`}>{this.state.provider}</a> mailbox for a login link.</p>)
    } else {
      const { handleSubmit } = this.props
      return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <p>Your best email, its the last time you will ever need it</p>
          <Field name='email' label='Email' component={renderField} type='email' validate={[required, email]} />
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
