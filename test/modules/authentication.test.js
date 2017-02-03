const expect = require('chai').expect

import { call, put, takeLatest } from 'redux-saga/effects'
import { push }                  from 'react-router-redux'
import { post }                  from '../../src/shared/modules/api'
import { rootPath }              from '../../src/shared/modules/urls'
import { 
  AUTHORIZE_SUCCEEDED,
  performLogin,
  performAuthorize
}                                from '../../src/shared/modules/authentication'

describe('(Autentication)', () => {
  it('login posts email to the server', () => {
    const payload = { email: 'test@example.com' }
    const gen = performLogin({ payload: payload })
    expect(gen.next().value).to.deep.equal(call(post, 'login', { login: payload }))
  })

  it('authorize redirects to identities on a successful authorize', () => {
    const payload = { token: 'VALID_TOKEN' }
    const gen = performAuthorize({ payload: payload })
    expect(gen.next().value).to.deep.equal(call(post, 'authorize', payload))
    expect(gen.next({}).value).to.deep.equal(put({ type: AUTHORIZE_SUCCEEDED }))
    expect(gen.next({}).value).to.deep.equal(put(push(rootPath)))
  })

  it('authorize doesnt redirect on an unsuccessful authorize', () => {
    const payload = { token: 'VALID_TOKEN' }
    const gen = performAuthorize({ payload: payload })
    expect(gen.next().value).to.deep.equal(call(post, 'authorize', payload))
    expect(gen.next().value).to.deep.equal(undefined)
  })
})