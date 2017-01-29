import React                        from 'react'
import { render }                   from 'react-dom'
import { Router, match }            from 'react-router'
import { Provider }                 from 'react-redux'
import { trigger }                  from 'redial'
import { createHistory }            from 'history'
import routes                       from '../shared/routes'
import configureStore               from '../shared/configureStore'

const history = createHistory()
const store = configureStore()

const { dispatch } = store

history.listen((location) => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    }

    const { components } = renderProps

    if (window.INITIAL_STATE) {
      delete window.INITIAL_STATE
    } else {
      trigger('fetch', components, locals)
    }

    trigger('defer', components, locals)
  })
})

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('react-view')
)
