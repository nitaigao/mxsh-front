require('babel-register')
require('babel-polyfill')

global.CONFIG = {
  API_HOST: process.env.API_HOST,
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
  SENTRY_PRIVATE_DSN: process.env.SENTRY_PRIVATE_DSN
}

const app = require('./server').default

const https = require('https')
const http  = require('http')

const options = {
  key: process.env.SSL_KEY.replace(/\\n/g, '\n'),
  cert: process.env.SSL_CERT.replace(/\\n/g, '\n')
}

const HTTP_PORT  = process.env.HTTP_PORT || 3000
const HTTPS_PORT = process.env.HTTPS_PORT || 3443

http.createServer(app).listen(HTTP_PORT, () =>
  console.log('HTTP Listening on port', HTTP_PORT)) // eslint-disable-line no-console

https.createServer(options, app).listen(HTTPS_PORT, () =>
  console.log('HTTPS Listening on port', HTTPS_PORT)) // eslint-disable-line no-console
