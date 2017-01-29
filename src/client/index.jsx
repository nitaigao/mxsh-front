import React                        from 'react'
import { render }                   from 'react-dom'
import { Router, match }            from 'react-router'
import { Provider }                 from 'react-redux'
import { trigger }                  from 'redial'
import { createStore }              from 'redux'
import { createHistory }            from 'history'
import routes                       from 'routes'
import configureStore               from '../shared/configureStore'

const history = createHistory()
const store = configureStore()

const { dispatch } = store

history.listen((location, ba) => {
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
      <Router children={routes} history={history} />
    </Provider>,
  document.getElementById('react-view')
)