import { createAction, handleActions }  from 'redux-actions'
import { takeLatest, call, put }        from 'redux-saga/effects'
import { get, post }                    from './api'

export const MINE                       = 'IDENTITIES/MINE'
export const IDENTITIES_FETCH_SUCCEEDED = 'IDENTITIES/IDENTITIES_FETCH_SUCCEEDED/'

export const CREATE_IDENTITY            = 'CREATE_IDENTITY/CREATE'
export const CREATE_IDENTITY_SUCCEEDED  = 'CREATE_IDENTITY/CREATE_IDENTITY_SUCCEEDED'

export const mine             = createAction(MINE)
export const createIdentity   = createAction(CREATE_IDENTITY)

export const reducers = handleActions({
  [IDENTITIES_FETCH_SUCCEEDED]: (state, action) => ({
    ...state,
    existing: action.identities
  }),
  [CREATE_IDENTITY_SUCCEEDED]: (state, action) => ({
    ...state,
    latest: action.identity,
    existing: [action.identity].concat(state.existing)
  })
}, { latest: null, existing: [] })

export function* performMine() {
  const response = yield call(get, 'identities')
  if (response) {
    yield put({ type: IDENTITIES_FETCH_SUCCEEDED, identities: response })
  }
}

export function* performCreateIdentity() {
  const response = yield call(post, 'identities')
  if (response) {
    yield put({ type: CREATE_IDENTITY_SUCCEEDED, identity: response })
  }
}

export function* saga() {
  yield [
    takeLatest(MINE, performMine),
    takeLatest(CREATE_IDENTITY, performCreateIdentity)
  ]
}
