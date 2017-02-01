import React                   from 'react'
import { Link }                from 'react-router'
import { connect }             from 'react-redux'
import { provideHooks }        from 'redial'

import { mine }                from  '../modules/identities'

import { identities }          from  '../selectors'

const hooks = {
  fetch: ({ dispatch, params }) => dispatch(mine())
}

const mapStateToProps = (state) => ({
  identities: identities(state)
})

const Identities = (props) => { 
  const { identities } = props
  return (
    <div id='identities'>
      Identities
      <ul>
        {identities.map((identity, i) => {
          return (<li key={i}>{identity.email}</li>)
        })}
      </ul>
    </div>
  )
}

Identities.propTypes = {
  identities: React.PropTypes.array.isRequired
}

const IdentitiesWithHooks = provideHooks(hooks)(Identities)
export default connect(mapStateToProps)(IdentitiesWithHooks)
