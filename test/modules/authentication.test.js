const expect = require('chai').expect

import { call, put, takeLatest } from 'redux-saga/effects'
import { push }                  from 'react-router-redux'
import { post }                  from '../../src/shared/modules/api'
import { identitiesPath }        from '../../src/shared/modules/urls'
import { 
  performLogin,
  performAuthorize
}                                from '../../src/shared/modules/authentication'

describe('(Autentication)', () => {
  it('performLogin posts email to the server', () => {
    const payload = { email: 'test@example.com' }
    const gen = performLogin({ payload: payload })
    expect(gen.next().value).to.deep.equal(call(post, 'login', { login: payload }))
  })

  it('performAuthorize redirects to identities on a successful authorize', () => {
    const payload = { token: 'VALID_TOKEN' }
    const gen = performAuthorize({ payload: payload })
    expect(gen.next().value).to.deep.equal(call(post, 'authorize', payload))
    expect(gen.next({}).value).to.deep.equal(put(push(identitiesPath)))
  })

  it('performAuthorize doesnt redirect on an unsuccessful authorize', () => {
    const payload = { token: 'VALID_TOKEN' }
    const gen = performAuthorize({ payload: payload })
    expect(gen.next().value).to.deep.equal(call(post, 'authorize', payload))
    expect(gen.next(null).value).to.not.deep.equal(put(push(identitiesPath)))
  })
})