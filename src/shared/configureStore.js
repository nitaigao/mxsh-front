import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools }          from 'redux-devtools-extension'
import { routerMiddleware }             from 'react-router-redux'

import createSagaMiddleware             from 'redux-saga'

import reducers                         from './modules/reducers'
import sagas                            from './modules/sagas'

export default function configureStore(history, preloadedState) {
  const historyMiddleWare = routerMiddleware(history)

  const composeEnhancers = composeWithDevTools({})

  const sagaMiddleware = createSagaMiddleware()

  const middleWare = applyMiddleware(sagaMiddleware, historyMiddleWare)

  const store = createStore(reducers, preloadedState, composeEnhancers(middleWare))

  const rootTask = sagaMiddleware.run(sagas)

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const nextRootReducer = require('./modules/reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, rootTask }
}
