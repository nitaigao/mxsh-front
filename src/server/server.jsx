'use strict'

import React                     from 'react'
import { RouterContext, match }  from 'react-router'
import { renderToString }        from 'react-dom/server'

import express                   from 'express'
import chokidar                  from 'chokidar'
import webpack                   from 'webpack'
import webpackConfig             from '../../webpack.config.js'

const app                        = express()
const compiler                   = webpack(webpackConfig)

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}))

app.use(require("webpack-hot-middleware")(compiler))

app.use((req, res) => {
  const routes = require('../shared/routes').default
  const location = req.url
  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if (err) { 
      console.error(err)
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) return res.status(404).end('Not found.')

    const InitialComponent = (
      <RouterContext {...renderProps} />
    )

    const componentHTML = renderToString(InitialComponent)

    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>mxsh</title>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>    
    `
    
    res.end(HTML)
  })
})

const watcher = chokidar.watch('./src/shared')

watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log("Clearing /shared/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]shared[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

export default app