import React                        from 'react';
import { render }                   from 'react-dom';
import { Router }                   from 'react-router';
import { Provider }                 from 'react-redux'
import { createStore }              from 'redux'
import { createHistory }            from 'history';
import routes                       from 'routes';
import configureStore               from '../shared/configureStore'

const history = createHistory()
const store = configureStore()

render(
    <Provider store={store}>
      <Router children={routes} history={history} />
    </Provider>,
  document.getElementById('react-view')
)