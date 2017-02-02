const expect = require('chai').expect

import { call, put, takeLatest } from 'redux-saga/effects'
import { push }                  from 'react-router-redux'
import { get, post }             from '../../src/shared/modules/api'
import { identitiesPath }        from '../../src/shared/modules/urls'
import { 
  IDENTITIES_FETCH_SUCCEEDED,
  CREATE_IDENTITY_SUCCEEDED,
  performMine,
  performCreateIdentity
}                                from '../../src/shared/modules/identities'

describe('(Autentication)', () => {
  it('mine populates the store with a list of identities on success', () => {
    const gen = performMine()
    expect(gen.next().value).to.deep.equal(call(get, 'identities'))
    const identities = [{email: 'test@example.com'}]
    expect(gen.next(identities).value).to.deep.equal(put({type: IDENTITIES_FETCH_SUCCEEDED, identities: identities }))
  })

  it('mine does not populate the store with a list of identities on failure', () => {
    const gen = performMine()
    expect(gen.next().value).to.deep.equal(call(get, 'identities'))
    expect(gen.next().value).to.deep.equal(undefined)
  })

  it('createIdentity populates the store with the new identity on success', () => {
    const gen = performCreateIdentity()
    expect(gen.next().value).to.deep.equal(call(post, 'identities'))
    const identity = {email: 'test@example.com'}
    expect(gen.next(identity).value).to.deep.equal(put({type: CREATE_IDENTITY_SUCCEEDED, identity: identity }))
  })

    it('createIdentity does not populate the store a new identity on failure', () => {
    const gen = performCreateIdentity()
    expect(gen.next().value).to.deep.equal(call(post, 'identities'))
    const identity = {email: 'test@example.com'}
    expect(gen.next().value).to.deep.equal(undefined)
  })
})