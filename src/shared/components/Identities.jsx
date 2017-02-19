import React, { Component }     from 'react'
import { Link }                 from 'react-router'
import { connect }              from 'react-redux'
import addrs                    from 'email-addresses'
import { first }                from 'lodash/first'
import styles                   from './Identities.css'
import classNames               from 'classnames'
import { FRONTEND_HOST }        from '../configuration'

import CopyToClipboard          from 'react-copy-to-clipboard';

import { identities }           from  '../selectors'

import { createIdentity } from  '../modules/identities'

const mapStateToProps = (state) => ({
  identities: identities(state)
})

class LatestIdentity extends Component {
 constructor(props) {
   super(props)
   this.state = {copied: false}
 }

 render() {
  const email = addrs.parseOneAddress(this.props.value)
  return (
    <div>
      <h1 className={styles.local}>{email.local}</h1>
      <h3 className={styles.domain}>@{email.domain}</h3>
      <CopyToClipboard text={this.props.value}
        onCopy={() => this.setState({copied: true})}>
        <button className={styles.copy}>Copy</button>
      </CopyToClipboard>
      {this.state.copied ? <h4 className={styles.copied}>Copied.</h4> : null}
    </div>
  )
 } 
}

class Identities extends Component {

  get small() {
    const { identities: { latest, existing } } = this.props
    if (latest) {
      return (
        <div className={styles.newEmail}>
          <LatestIdentity value={latest.email}/>
        </div>
      )
    } else {
      return (
        <div className={styles.newForm}>
          <h3 className={styles.title}>New Address</h3>
          <button onClick={this.handleNewClick} className='circle proceed'>
            <i className={classNames('icon', 'ion-plus-round', styles.icon)}></i>
          </button>
          <a className={styles.somethingElse} target="_blank" href={FRONTEND_HOST}>something else?</a>
        </div>
      )
    }
  }
  render () {
    return (
      <div className={styles.small}>
        {this.small}
      </div>
    )
  }

  handleNewClick = () => {
    const { createIdentity } = this.props
    createIdentity()
  }
}

Identities.propTypes = {
  identities: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, { createIdentity })(Identities)
