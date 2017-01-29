import { createStore, combineReducers } from 'redux'
import { createAction }                 from 'redux-actions';
import { reducer as formReducer }       from 'redux-form'
import { call, put, takeLatest }        from 'redux-saga/effects'

import { post }                         from './api'

export const LOGIN     = 'LOGIN'
export const AUTHORIZE = 'AUTHORIZE'

export const login     = createAction(LOGIN    , payload => payload);
export const authorize = createAction(AUTHORIZE, payload => payload);

export const reducer = combineReducers({form: formReducer})

function * performLogin({payload}) {
  yield call(post, 'login', { login: payload })
}

function * performAuthorize({payload}) {
  console.log('authorize with key', payload)
  // yield call(post, 'login', { login: payload })
}

export const saga = function * () {
  yield [
    takeLatest(LOGIN,     performLogin),
    takeLatest(AUTHORIZE, performAuthorize)
  ]
}