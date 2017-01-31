import React                   from 'react'
import { Link }                from 'react-router'
import { connect }             from 'react-redux'
import { provideHooks }        from 'redial'

import { mine }                from  '../modules/identities'

const hooks = {
  fetch: ({ dispatch, params }) => dispatch(mine())
}

const Identities = () => (
  <div id='identities'>
    Identities Page
  </div>
)

const IdentitiesWithHooks = provideHooks(hooks)(Identities)
export default connect()(IdentitiesWithHooks)
