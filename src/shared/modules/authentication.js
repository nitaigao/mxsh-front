import { createStore, combineReducers } from 'redux'
import { createAction }                 from 'redux-actions';
import { reducer as formReducer }       from 'redux-form'
import { call, put, takeLatest }        from 'redux-saga/effects'

export const LOGIN = 'LOGIN'

export const login = createAction(LOGIN, email => email);

export const reducer = combineReducers({form: formReducer})

function * performLogin({payload}) {
  console.log(payload)
}

export const saga = function * () {
  yield [
    takeLatest(LOGIN, performLogin)
  ]
}