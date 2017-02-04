'use strict'

import React                     from 'react'
import { Provider }              from 'react-redux'
import { RouterContext, match }  from 'react-router'
import { renderToString }        from 'react-dom/server'
import { trigger }               from 'redial'

import configureStore            from '../shared/configureStore'

import express                   from 'express'
import proxy                     from 'http-proxy-middleware'
import cookies                   from 'react-cookie'
import cookieParser              from 'cookie-parser'

import path                      from 'path'
import chokidar                  from 'chokidar'
import last                      from 'lodash/last'

const app                        = express()

const ENVIRONMENT = process.env.NODE_ENV || 'development'
const DEVELOPMENT = ENVIRONMENT === 'development'

app.use(cookieParser())

const API_HOST = process.env.API_HOST || 'http://mxsh.lvh.me:4000'
app.use('/api', proxy({ target: API_HOST, changeOrigin: true }))

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

app.use((req, res) => {
  const routes = require('../shared/routes').default
  const location = req.url
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    const unplug = cookies.plugToRequest(req, res)

    if (err) { 
      console.error(err)
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) return res.status(404).end('Not found.')

    const isSSR = last(renderProps.routes).ssr

    if (!isSSR) {
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>mxsh</title>
        </head>
        <body>
          <div id="react-view"></div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>`
      res.end(HTML)
      return
    } 

    const preloadedState = {
      authentication: {
        loggedIn: req.cookies.auth != null
      }
    }
    
    const store = configureStore(null, preloadedState)

    const { dispatch, getState } = store

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    }

    const { components } = renderProps

    trigger('fetch', components, locals)
      .then(() => {
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const HTML = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>mxsh</title>
            </head>
            <body>
              <div id="react-view">${html}</div>
              <script>
                 window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
              </script>
              <script type="application/javascript" src="/bundle.js"></script>
            </body>
          </html>`
        res.end(HTML)
      })
  })
})

export default app
