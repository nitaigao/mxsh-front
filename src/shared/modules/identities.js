import { createAction }            from 'redux-actions'
import { takeLatest, call }        from 'redux-saga/effects'
import { get }                     from './api'

export const MINE     = 'IDENTITIES/MINE'

export const mine     = createAction(MINE)

function* performMine() {
  yield call(get, 'identities', { id: 0 })
}

export function* saga() {
  yield [
    takeLatest(MINE, performMine)
  ]
}
