'use strict'

import React                     from 'react'
import { Provider }              from 'react-redux'
import { RouterContext, match }  from 'react-router'
import { renderToString }        from 'react-dom/server'
import { trigger }               from 'redial'

import configureStore            from '../shared/configureStore'
import { RAVEN_PUBLIC_DSN, 
         RAVEN_PRIVATE_DSN }     from '../shared/configuration'

import express                   from 'express'
import proxy                     from 'http-proxy-middleware'
import cookies                   from 'react-cookie'
import cookieParser              from 'cookie-parser'
import Raven                     from 'raven'

import path                      from 'path'
import chokidar                  from 'chokidar'
import last                      from 'lodash/last'

const app                        = express()

const ENVIRONMENT = process.env.NODE_ENV || 'development'
const DEVELOPMENT = ENVIRONMENT === 'development'

Raven.config(RAVEN_PRIVATE_DSN).install()

app.use(Raven.requestHandler(RAVEN_PRIVATE_DSN));
app.use(cookieParser())
app.use(Raven.errorHandler(RAVEN_PRIVATE_DSN))

const API_HOST = process.env.API_HOST || 'http://mxsh.lvh.me:4000'
app.use('/api', proxy({ target: API_HOST, changeOrigin: true, onError: (err, req, res) => {
  Raven.captureException(err)
}}))

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

const template = (preloadedState, html) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>mxsh</title>
        <script src="https://cdn.ravenjs.com/3.10.0/raven.min.js" crossorigin="anonymous"></script>
        <script>Raven.config('${RAVEN_PUBLIC_DSN}').install();</script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-91452305-1', 'auto');
          ga('send', 'pageview');
        </script>
      </head>
      <body>
        <div id="react-view">${html}</div>
        ${preloadedState}
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>`
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
      const HTML = template()
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
        const state = `
          <script>
             window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
          </script>`
        const HTML = template(state, html)
        res.end(HTML)
      }).catch(err => Raven.captureException(err))
  })
})

export default app
