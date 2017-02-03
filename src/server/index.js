require('babel-register')
require('babel-polyfill')

const server = require('./server')

const PORT = process.env.PORT || 3000

server.default.listen(PORT, () =>
  /* eslint-disable no-console */
  console.log('Listening on port', PORT))
  /* eslint-enable no-console */
