import { createAction, handleActions }  from 'redux-actions'
import { takeLatest, call, put }        from 'redux-saga/effects'
import { get }                          from './api'

export const MINE                       = 'IDENTITIES/MINE'
export const IDENTITIES_FETCH_SUCCEEDED = 'IDENTITIES/IDENTITIES_FETCH_SUCCEEDED/'

export const mine     = createAction(MINE)

const identitiesFetchReducer = handleActions({
  [IDENTITIES_FETCH_SUCCEEDED]: (state, action) => state.concat(action.identities)
}, [])

export const reducers = identitiesFetchReducer

export function* performMine() {
  const response = yield call(get, 'identities')
  if (response) {
    yield put({ type: IDENTITIES_FETCH_SUCCEEDED, identities: response })
  }
}

export function* saga() {
  yield [
    takeLatest(MINE, performMine)
  ]
}
