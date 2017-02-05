require('babel-register')
require('babel-polyfill')

const server = require('./server')

const PORT = process.env.PORT || 3000

server.default.listen(PORT, () =>
  console.log('Listening on port', PORT)) // eslint-disable-line no-console
