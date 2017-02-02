import React, { Component }     from 'react'
import { Link }                 from 'react-router'
import { connect }              from 'react-redux'
import { provideHooks }         from 'redial'

import { mine, createIdentity } from  '../modules/identities'

import { identities }           from  '../selectors'

const hooks = {
  fetch: ({ dispatch, params }) => dispatch(mine())
}

const mapStateToProps = (state) => ({
  identities: identities(state)
})

class Identities extends Component {
  render () {
    const { identities } = this.props
    return (
      <div id='identities'>
        Identities
        <button onClick={this.handleNewClick}>New Identity</button>
        <ul>
          {identities.map((identity, i) => {
            return (<li key={i}>{identity.email}</li>)
          })}
        </ul>
      </div>
    )
  }

  handleNewClick = () => {
    const { createIdentity } = this.props
    createIdentity()
  }
}

Identities.propTypes = {
  identities: React.PropTypes.array.isRequired
}

const IdentitiesWithHooks = provideHooks(hooks)(Identities)
export default connect(mapStateToProps, { createIdentity })(IdentitiesWithHooks)
