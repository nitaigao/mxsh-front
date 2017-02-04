import React, { Component }     from 'react'
import { Link }                 from 'react-router'
import { connect }              from 'react-redux'
import { first }                from 'lodash/first'

import { identities }       from  '../selectors'

import { mine, createIdentity } from  '../modules/identities'

const mapStateToProps = (state) => ({
  identities: identities(state)
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  createIdentity,
  mine
})

class Identities extends Component {
  componentWillMount() {
    const { mine, dispatch } = this.props
    dispatch(mine())
  }

  render () {
    const { identities: { latest, existing } } = this.props
    return (
      <div id='identities'>
        Identities
        <button onClick={this.handleNewClick}>New Identity</button>
        <ul>
          {existing.map((identity, i) => {
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
  identities: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Identities)
