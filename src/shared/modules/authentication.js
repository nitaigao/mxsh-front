import { createStore, combineReducers } from 'redux'
import { createAction }                 from 'redux-actions';
import { reducer as formReducer }       from 'redux-form'

export const login = createAction('LOGIN', email => email);

export const reducer = combineReducers({form: formReducer})