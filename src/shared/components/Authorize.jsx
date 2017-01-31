import React                   from 'react'
import { Link }                from 'react-router'
import { connect }             from 'react-redux'
import { provideHooks }        from 'redial'

import { authorize }           from  '../modules/authentication'

const hooks = {
  fetch: ({ dispatch, params }) => dispatch(authorize(params))
}

const Authorize = () => (
  <div id='authorize'>
    <Link to='/'>Home</Link>
  </div>
)

const AuthorizeWithHooks = provideHooks(hooks)(Authorize)
export default connect()(AuthorizeWithHooks)
