import React                 from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout     from './layouts/Layout'

import Home       from './components/Home'
import Authorize  from './components/Authorize'
import Identities from './components/Identities'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='authorize/:token' component={Authorize} />
  </Route>
)
