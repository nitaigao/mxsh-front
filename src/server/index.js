var express = require('express')
var app = express()

var ReactServer = require('react-dom/server')

PORT = process.env.PORT || 3000

var React = require('react'),
    DOM = React.DOM, div = DOM.div

var HelloWorld = React.createClass({
  render: () => div(null, 'Hello World'),
})

var props = {}

app.get('*', (req, res) => {
  var result = ReactServer.renderToString(React.createElement(HelloWorld, props))
  res.send(result);
})

app.listen(PORT, () => 
  console.log('Listening on port', PORT))