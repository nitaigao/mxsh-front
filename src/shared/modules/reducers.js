import { combineReducers            } from 'redux'
import { reducer as formReducer     } from 'redux-form'

import { reducers as authentication } from './authentication'
import { reducers as identities     } from './identities'

export default combineReducers({
  form: formReducer,
  authentication,
  identities
})
