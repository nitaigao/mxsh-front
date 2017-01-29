import { combineReducers }              from 'redux'
import { createAction }                 from 'redux-actions'
import { reducer as formReducer }       from 'redux-form'
import { call, takeLatest }             from 'redux-saga/effects'

import { post }                         from './api'

export const LOGIN     = 'LOGIN'
export const AUTHORIZE = 'AUTHORIZE'

export const login     = createAction(LOGIN, payload => payload)
export const authorize = createAction(AUTHORIZE, payload => payload)

export const reducer = combineReducers({ form: formReducer })

function* performLogin({ payload }) {
  yield call(post, 'login', { login: payload })
}

function* performAuthorize({ payload }) {
  yield call(post, 'authorize', { key: payload })
}

export function* saga() {
  yield [
    takeLatest(LOGIN, performLogin),
    takeLatest(AUTHORIZE, performAuthorize)
  ]
}
