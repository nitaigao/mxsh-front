import { combineReducers }              from 'redux'
import { createAction }                 from 'redux-actions'
import { reducer as formReducer }       from 'redux-form'
import { push }                         from 'react-router-redux'
import { call, put, takeLatest }        from 'redux-saga/effects'

import { post }                         from './api'
import { identitiesPath }               from './urls'

export const LOGIN     = 'AUTHENTICATION/LOGIN'
export const AUTHORIZE = 'AUTHENTICATION/AUTHORIZE'

export const login     = createAction(LOGIN, payload => payload)
export const authorize = createAction(AUTHORIZE, payload => payload)

export const reducers = combineReducers({ form: formReducer })

function* performLogin({ payload }) {
  yield call(post, 'login', { login: payload })
}

function* performAuthorize({ payload }) {
  const auth = yield call(post, 'authorize', payload)
  if (auth) {
    yield put(push(identitiesPath))
  }
}

export function* saga() {
  yield [
    takeLatest(LOGIN, performLogin),
    takeLatest(AUTHORIZE, performAuthorize)
  ]
}
