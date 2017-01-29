import { createStore, applyMiddleware }           from 'redux'
import { composeWithDevTools }   from 'redux-devtools-extension'

import createSagaMiddleware      from 'redux-saga'

import { reducer, saga }         from './modules/authentication'

export default function configureStore(preloadedState = {}) {
  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()
  const middleWare = applyMiddleware(sagaMiddleware)
  const store = createStore(reducer, preloadedState, composeEnhancers(middleWare))
  sagaMiddleware.run(saga)
  return store
}
