import { combineReducers }              from 'redux'
import { reducer as formReducer }       from 'redux-form'

import { reducers as identities }       from './identities'

export default combineReducers({
  form: formReducer,
  identities
})
