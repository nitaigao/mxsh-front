import fetch                    from 'isomorphic-fetch'
import cookies                  from 'react-cookie'
import { FRONTEND_API_PREFIX }  from '../configuration'

const HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' }

export function post(resource, params = {}) {
  const resourcePath = `${FRONTEND_API_PREFIX}/${resource}`
  const jsonParams = JSON.stringify(params)
  /* eslint-disable no-console */
  console.log('[POST]', '->', resourcePath, jsonParams)
  /* eslint-enable no-console */
  const authCookie = cookies.load('auth')
  return fetch(resourcePath, {
    method: 'POST',
    headers: { ...HEADERS,
      Authorization: `Bearer ${authCookie}`
    },
    body: jsonParams,
    credentials: 'include'
  }).then(response => response.json())
}

export function get(resource) {
  const resourcePath = `${FRONTEND_API_PREFIX}/${resource}`
  /* eslint-disable no-console */
  console.log('[GET]', '->', resourcePath)
  /* eslint-enable no-console */
  const authCookie = cookies.load('auth')
  return fetch(resourcePath, {
    method: 'GET',
    headers: { ...HEADERS,
      Authorization: `Bearer ${authCookie}`
    },
    credentials: 'include'
  }).then(response => response.json())
}

export function del(resource) {
  const resourcePath = `${FRONTEND_API_PREFIX}/${resource}`
  /* eslint-disable no-console */
  console.log('[DELETE]', '->', resourcePath)
  /* eslint-enable no-console */
  const authCookie = cookies.load('auth')
  return fetch(resourcePath, {
    method: 'DELETE',
    headers: { ...HEADERS,
      Authorization: `Bearer ${authCookie}`
    },
    credentials: 'include'
  }).then(response => response.json())
}
