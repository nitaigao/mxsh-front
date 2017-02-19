import React, { Component }     from 'react'
import { Link }                 from 'react-router'
import { connect }              from 'react-redux'
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
      <div className='containera'>
        <div className='rowa'>
          <div className='col-1a'>
            <div className={styles.newEmail}>
              <h3>New Address</h3>
              <button className='circle proceed'>
                <i className={classNames('icon', 'ion-plus-round', styles.icon)}></i>
              </button>
              <a className={styles.somethingElse} target="_blank" href={FRONTEND_HOST}>something else?</a>
            </div>
          </div>
        </div>
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
