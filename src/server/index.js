require('babel-register')
require('babel-polyfill')

global.CONFIG = {
  API_HOST: process.env.API_HOST,
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
  SENTRY_PRIVATE_DSN: process.env.SENTRY_PRIVATE_DSN
}

console.log(global.CONFIG) // eslint-disable-line no-console

const app = require('./server').default

const http  = require('http')
const https = require('https')

const HTTP_PORT  = process.env.HTTP_PORT || 3000

http.createServer(app).listen(HTTP_PORT, () =>
  console.log('HTTP Listening on port', HTTP_PORT)) // eslint-disable-line no-console

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: process.env.SSL_KEY.replace(/\\n/g, '\n'),
    cert: process.env.SSL_CERT.replace(/\\n/g, '\n')
  }

  const HTTPS_PORT = process.env.HTTPS_PORT || 3443

  https.createServer(options, app).listen(HTTPS_PORT, () =>
    console.log('HTTPS Listening on port', HTTPS_PORT)) // eslint-disable-line no-console
}
