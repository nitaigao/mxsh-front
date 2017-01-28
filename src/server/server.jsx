'use strict'

import React                     from 'react'
import { Provider }              from 'react-redux'
import { RouterContext, match }  from 'react-router'
import { renderToString }        from 'react-dom/server'

import configureStore            from '../shared/configureStore'

import express                   from 'express'
import proxy                     from 'express-http-proxy'

import path                      from 'path'
import chokidar                  from 'chokidar'

const app                        = express()

const ENVIRONMENT = process.env.NODE_ENV || 'development'
const DEVELOPMENT = ENVIRONMENT === 'development'

if (DEVELOPMENT) {
  const webpack       = require('webpack')
  const webpackConfig = require('../../webpack.config.dev.js')
  const compiler      = webpack(webpackConfig)

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }))
  app.use(require("webpack-hot-middleware")(compiler))

  const watcher = chokidar.watch('./src/shared')
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log("Clearing /shared/ module cache from server")
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]shared[\/\\]/.test(id)) delete require.cache[id]
      })
    })
  })
} else {
  app.use(express.static(path.resolve(__dirname, '../../dist')))
}

const API_HOST = process.env.API_HOST || 'http://api.lvh.me:4000'

app.use('/api', proxy(API_HOST))

app.use((req, res) => {
  const routes = require('../shared/routes').default
  const location = req.url
  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if (err) { 
      console.error(err)
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) return res.status(404).end('Not found.')

    const store = configureStore()

    const InitialComponent = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
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
export default app