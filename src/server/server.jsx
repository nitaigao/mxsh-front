import React                     from 'react'
import { Provider }              from 'react-redux'
import { END }                   from 'redux-saga'
import { RouterContext, match }  from 'react-router'
import { renderToString }        from 'react-dom/server'
import { trigger }               from 'redial'

import assets                    from '../../dist/assets'

import configureStore            from '../shared/configureStore'

import { SENTRY_PUBLIC_DSN,
         SENTRY_PRIVATE_DSN,
         BACKEND_API_HOST,
         FRONTEND_API_HOST }     from '../shared/configuration'

import express                   from 'express'
import morgan                    from 'morgan'
import proxy                     from 'http-proxy-middleware'
import cookies                   from 'react-cookie'
import cookieParser              from 'cookie-parser'
import Raven                     from 'raven'
import enforce                   from 'express-sslify'

import path                      from 'path'
import chokidar                  from 'chokidar'
import last                      from 'lodash/last'

const app                        = express()

if (__PROD__) {
  Raven.config(SENTRY_PRIVATE_DSN).install()
  app.use(enforce.HTTPS())
}

app.use(morgan('combined'))
app.use(Raven.requestHandler(SENTRY_PRIVATE_DSN))
app.use(cookieParser())
app.use(Raven.errorHandler(SENTRY_PRIVATE_DSN))

app.use('/api', proxy({ target: BACKEND_API_HOST, changeOrigin: true, onError: (err, req, res) => {
  Raven.captureException(err)
}}))

app.use(express.static('dist', { maxage: '1d' }))

const template = (state, html) => {
  const preloadedState = `
    <script>
       window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
    </script>`
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Mail Shield</title>
        <meta name="apple-mobile-web-app-title" content="Mail Shield">
        <meta name="apple-mobile-web-app-capable" content="no">
        <script>
          window.CONFIG = ${JSON.stringify(CONFIG)}
        </script>
        <script src="https://cdn.ravenjs.com/3.10.0/raven.min.js" crossorigin="anonymous"></script>
        <script>Raven.config('${SENTRY_PUBLIC_DSN}').install();</script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-91452305-1', 'auto');
          ga('send', 'pageview');
        </script>
        <script>
          window['_fs_debug'] = false;
          window['_fs_host'] = 'www.fullstory.com';
          window['_fs_org'] = '343QW';
          window['_fs_namespace'] = 'FS';
          (function(m,n,e,t,l,o,g,y){
              if (e in m && m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); return;}
              g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
              o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
              y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
              g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
              g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
              g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[\`;\`]*\`[\`;\`]*\`[\`;\`]*\`')){
              d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
              \';path=/;expires=\'+new Date(0).toUTCString();i=d.indexOf(\'.\');if(i<0)break;d=d.slice(i+1)}}};
          })(window,document,window['_fs_namespace'],'script','user');
        </script>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="theme-color" content="#ffffff">
      </head>
      <body>
        <div id="react-view">${html || ''}</div>
        ${preloadedState || ''}
        <script type="application/javascript" src="/${assets.main.js}"></script>
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

    res.set('Cache-Control', 'private, max-age=0, must-revalidate')

    const preloadedState = {
      authentication: {
        loggedIn: req.cookies.auth != null
      }
    }
    
    const { store, rootTask } = configureStore(null, preloadedState)

    const { dispatch, getState } = store

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      state: getState(),
      dispatch
    }

    const { components } = renderProps

    trigger('fetch', components, locals)

    store.dispatch(END)
    
    rootTask.done.then(() => {
      const state = getState()
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const HTML = template(state, html)
      res.end(HTML)
    }).catch(err => {
      Raven.captureException(err)
      res.clearCookie('auth')
      res.redirect(500, '/')
    })
  })
})

export default app
