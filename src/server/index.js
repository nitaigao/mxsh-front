require('babel-register')
require('babel-polyfill')

global.CONFIG = {
  API_HOST: process.env.API_HOST,
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
  SENTRY_PRIVATE_DSN: process.env.SENTRY_PRIVATE_DSN
}

const app = require('./server').default

const PORT  = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log('Listening on port', PORT)) // eslint-disable-line no-console
