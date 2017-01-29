import path  from 'path-browserify'
import fetch from 'isomorphic-fetch'

export function post(resource, params) {
  const apiResource = path.join('api', resource)
  const jsonParams = JSON.stringify(params)
  console.log('[POST]', '->', apiResource, jsonParams)
  return fetch(apiResource, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonParams
  })
}