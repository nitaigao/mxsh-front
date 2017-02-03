import { createAction, handleActions }  from 'redux-actions'
import { push }                         from 'react-router-redux'
import { call, put, takeLatest }        from 'redux-saga/effects'

import { post }                         from './api'
import { rootPath }                     from './urls'

export const LOGIN               = 'AUTHENTICATION/LOGIN'
export const AUTHORIZE           = 'AUTHENTICATION/AUTHORIZE'
export const AUTHORIZE_SUCCEEDED = 'AUTHENTICATION/AUTHORIZE_SUCCEEDED'

export const login     = createAction(LOGIN, payload => payload)
export const authorize = createAction(AUTHORIZE, payload => payload)

export const reducers = handleActions({
  [AUTHORIZE_SUCCEEDED]: () => ({ loggedIn: true })
}, { loggedIn: false })

export function* performLogin({ payload }) {
  yield call(post, 'login', { login: payload })
}

export function* performAuthorize({ payload }) {
  const auth = yield call(post, 'authorize', payload)
  if (auth) {
    yield put({ type: AUTHORIZE_SUCCEEDED })
    yield put(push(rootPath))
  }
}

export function* saga() {
  yield [
    takeLatest(LOGIN, performLogin),
    takeLatest(AUTHORIZE, performAuthorize)
  ]
}
