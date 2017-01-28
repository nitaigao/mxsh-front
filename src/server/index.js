'use strict';

require('babel-register')
require("babel-polyfill");

var server = require('./server');

var PORT = process.env.PORT || 3000

server.default.listen(PORT, () => 
  console.log('Listening on port', PORT))