import path    from 'path-browserify'
import fetch   from 'isomorphic-fetch'

export function post(resource, params) {
  const resoucePath = path.join('api', resource)
  const apiResource = `http://mxsh.lvh.me:3000/${resoucePath}`
  const jsonParams = JSON.stringify(params)
  /* eslint-disable no-console */
  console.log('[POST]', '->', apiResource, jsonParams)
  /* eslint-enable no-console */
  return fetch(apiResource, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: jsonParams,
    credentials: 'include'
  }).then(response => response.json())
}

export function get(resource) {
  const resoucePath = path.join('api', resource)
  const apiResource = `http://mxsh.lvh.me:3000/${resoucePath}`
  /* eslint-disable no-console */
  console.log('[GET]', '->', apiResource)
  /* eslint-enable no-console */
  return fetch(apiResource, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(response => response.json())
}
