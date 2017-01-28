import { createStore }           from 'redux'
import { composeWithDevTools }   from 'redux-devtools-extension';
import { reducer }               from './modules/authentication'

export default function configureStore(preloadedState={}) {
  const composeEnhancers = composeWithDevTools({})
  const store = createStore(reducer, preloadedState, composeEnhancers())
  return store
}