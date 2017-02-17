import React, { Component }     from 'react'
import { Link }                 from 'react-router'
import { connect }              from 'react-redux'
import { first }                from 'lodash/first'
import styles                   from './Identities.css'
import classNames               from 'classnames'

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
  return (
    <div>
      <span>
        {this.props.value}
      </span>
      <CopyToClipboard text={this.props.value}
        onCopy={() => this.setState({copied: true})}>
        <button>Copy</button>
      </CopyToClipboard>

      {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
    </div>
  )
 } 
}

class Identities extends Component {
  render () {
    const { identities: { latest, existing } } = this.props
    return (
      <div className={styles.identities}>
        <div className={styles.newIdentity}>
          <h3>
            New Identity
            <button onClick={this.handleNewClick}>Create Identity</button>
          </h3>
          {latest && <LatestIdentity value={latest.email} />}
        </div>
        {existing.length > 0 &&
          <div className={styles.existing}>
            <ul>
              {existing.map((identity, i) => {
                return (
                  <li key={i} className={styles.card}>
                    <div className={styles.identity}>
                      <div className={styles.heading}>{identity.email}</div>
                      <div className={styles.body}>{identity.received}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        }
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
