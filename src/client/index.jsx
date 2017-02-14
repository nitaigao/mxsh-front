import React                              from 'react'
import { render }                         from 'react-dom'
import { Router, match }                  from 'react-router'
import { Provider }                       from 'react-redux'
import { trigger }                        from 'redial'
import { createHistory }                  from 'history'
import { syncHistoryWithStore }           from 'react-router-redux'
import routes                             from '../shared/routes'
import configureStore                     from '../shared/configureStore'

const history = createHistory()

const preloadedState = window.__PRELOADED_STATE__
const { store } = configureStore(history, preloadedState)

const { dispatch, getState } = store

function renderLocation(location) {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      state: getState(),
      dispatch
    }

    const { components } = renderProps

    if (window.__PRELOADED_STATE__) {
      delete window.__PRELOADED_STATE__
    } else {
      trigger('fetch', components, locals)
    }

    trigger('defer', components, locals)
  })
}

history.listen(renderLocation)
renderLocation(history.getCurrentLocation())

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('react-view')
)
