import React                    from 'react'
import { Field, reduxForm }     from 'redux-form'
import addrs                    from 'email-addresses'
import isEmail                  from 'validator/lib/isEmail'
import styles                   from './LoginForm.css'
import classNames               from 'classnames'
import parseDomain              from 'parse-domain'
import { FRONTEND_HOST }        from '../configuration'

const email = value => 
  value && !isEmail(value) ? 'Invalid email address' : undefined

const required = value => value ? undefined : 'Required'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='field-group'>
    {touched && ((error && <div className='field-error'>{error}</div>) || (warning && <div>{warning}</div>))}
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
    const hostname = parseDomain(email.domain).domain
    this.setState({submitted: true, provider: hostname})
  }

  render() {
    if (this.state.submitted) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className={styles.checkMail}>
                <i className={classNames('icon', 'ion-archive', styles.mailbox)}></i>
                <p className={styles.checkText}>Please check your <a className={styles.mailLink} target='_blank' href={`http://${this.state.provider}`}>{this.state.provider}</a><br/> mailbox for a sign in link</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      const { handleSubmit } = this.props
      return (
        <div className={styles.page}>
          <div className={'container'}>
            <div className={'row'}>
              <div className='col-12'>
                <div className={styles.extension}>
                  <img src='/icon.svg'></img>
                  <a className='button proceed' target="_blank" href={FRONTEND_HOST}>SIGN IN</a>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(this.onSubmit)}>
                  <img className={styles.shield} src='/icon.svg'></img>
                  <h1 className={styles.name}>MAIL SHIELD</h1>
                  <div className={styles.fields}>
                    <Field name='email' label='Email Address' component={renderField} type='email' validate={[required, email]} />
                    <button className='proceed' type='submit'>SIGN IN</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({ form: 'login' })(LoginForm)
