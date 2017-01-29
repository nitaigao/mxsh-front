import path from 'path-browserify'
import fetch from 'isomorphic-fetch'

function post(resource, params) {
  const apiResource = path.join('api', resource)
  const jsonParams = JSON.stringify(params)
  /* eslint-disable no-console */
  console.log('[POST]', '->', apiResource, jsonParams)
  /* eslint-enable no-console */
  return fetch(apiResource, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonParams,
  })
}

export default { post }
